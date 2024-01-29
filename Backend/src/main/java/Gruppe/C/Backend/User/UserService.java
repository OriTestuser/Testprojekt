package Gruppe.C.Backend.User;

import Gruppe.C.Backend.ChessBot.ChessBot;
import Gruppe.C.Backend.ChessBot.ChessBotRepository;
import Gruppe.C.Backend.ChessClub.ChessClub;
import Gruppe.C.Backend.ChessClub.ChessClubMembership;
import Gruppe.C.Backend.ChessClub.ChessClubMembershipRepository;
import Gruppe.C.Backend.ChessGame.ChessGame;
import Gruppe.C.Backend.ChessGame.ChessGameRepository;
import Gruppe.C.Backend.ChessGame.TimeStampDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import Gruppe.C.Backend.Services.TwoFactorAuthentication;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    TwoFactorAuthentication tfa = new TwoFactorAuthentication();
    private final static String userNotFound = "User with email %s not found"; //für Exception, damit email mit angegeben wird
    @Autowired
    private final UserRepository userRepository;
    private final ChessClubMembershipRepository chessClubMembershipRepository;
    private final ChessGameRepository chessGameRepository;
    private final ChessBotRepository  chessBotRepository;

    public UserService(UserRepository userRepository, ChessClubMembershipRepository chessClubMembershipRepository, ChessGameRepository chessGameRepository, ChessBotRepository chessBotRepository) { //Zugriff auf das Repository durch Instanz des UserRepository
        this.userRepository = userRepository;
        this.chessClubMembershipRepository = chessClubMembershipRepository;
        this.chessGameRepository = chessGameRepository;
        this.chessBotRepository = chessBotRepository;
    }

    public boolean authenticate (String email, String password) throws UserNotFoundException { //Methode zur Authentifizierung des Nutzers
        //neuer User wird erstellt:
        User user = userRepository.getUserByEmail(email); //wenn Mail korrekt wird user mit dieser mailadresse erstellt,
                                                          //sonst ist user null

        if(user == null) { //falls User nicht gefunden wird bzw nicht null
            throw new UserNotFoundException(String.format(userNotFound, email)); //Exception wird geworfen
        }


        else if(user.getPassword().equals(password)) { //überprüfung, ob übergebenes pw mit pw aus der datenbank übereinstimmt
                tfa.generateToken(user); //generierung des token für 2FA

                System.out.println("Login erfolgreich");
                return true;

        }

        else {
            System.out.println("Falsches Passwort");
            return false; //sonst wrong pw
        }

    }

    public User getUserByEmail(User user) { //Hilfsmethode um User anhand der Mail zu finden, für Login im Controller

        User foundUser = userRepository.getUserByEmail(user.getEmail());

        if(foundUser != null) {
            return foundUser;
        }
        return null;
    }



    public void saveToken(String email) throws UserNotFoundException {

        //Generierter Token für 2FA wird in der DB gespeichert
        Optional<User> userOptional = userRepository.findUserByEmail(email); //Optional, falls User null, damit keine Exception im if

        if(userOptional.isPresent()) { //wenn user im repository gefunden wurde, wird neuer user erstellt und token gespeichert
            User user = userOptional.get();
            user.setToken(tfa.getToken());
            userRepository.save(user);
        }

        else {
            throw new UserNotFoundException("User nicht gefunden"); // falls User nicht vorhanden
        }

    }

    public boolean authenticateTwoFA (User user, String twoFA) {

        boolean findUser = userRepository.findUserByEmail(user.getEmail()).isPresent(); //Überprüfen, ob user vorhanden

        if(findUser) {

            if(tfa.checkToken(user, twoFA)) { //Überprüfung, ob übergebener Token mit dem in der DB übereinstimmt
                System.out.println("Login erfolgreich");
                return true;
            }
            else {
                System.out.println("Zweiter Faktor falsch");
                return false;
            }
        }

        System.out.println("User nicht gefunden");
        return false;


    }

    public User createUser(User userRequest) {
        boolean userExists = userRepository.findUserByEmail(userRequest.getEmail()).isPresent();
        if(userExists){
            User user = new User(userRequest.getFirstName(), userRequest.getLastName(), userRequest.getEmail(), userRequest.getBirthDate(), userRequest.getProfileImage());
            //Wenn der user existiert wird dieser dem frontend wieder gegeben

            //TODO: überlegen was man statt null übergeben kann
            return user;
        }
        else{
            //Überprüfung ob der inhalt von allen feldern ausser dem bild nicht leer ist
            if(userRequest.getEmail()!=null&&userRequest.getBirthDate()!=null&&userRequest.getFirstName()!=null
            &&userRequest.getLastName()!=null&&userRequest.getPassword()!=null) {
                //Hier wir ein neuer user in der Datenbank angelegt entweder mit oder ohne Profilbild

                return userRepository.save(userRequest);
            }
            User user = new User(userRequest.getFirstName(), userRequest.getLastName(), userRequest.getEmail(), userRequest.getBirthDate(), userRequest.getProfileImage());
            return user;
        }

    }

    public Boolean updatePrivacy(User privacy) {
        //Sucht ein Objekt user in der datenbank anhand der email da diese ein primär schlüssel ist und setzt dann dann wert auf den übergebenen
        User user=userRepository.getUserByEmail(privacy.getEmail()); //Durchsucht das userRepository nach der email die im User object privacy übergeben wird
        user.setPrivacy(privacy.isPrivacy());
        userRepository.save(user);
        return true;
    }

    //für Profilansicht
    public Optional<User> getUserProfile(Long userId) {
        // Datenbankabfrage ausführen, um das Benutzerprofil abzurufen
        return userRepository.findById(userId);
    }


    //für Finden eines Users anhand der E-Mail Adresse
    public Optional<User> findUserByEmailAdress(String email) {
        return userRepository.findUserByEmail(email);
    }

    //für Liste der Schachclubs
    public ResponseEntity<List<ChessClub>> getChessClubs(Long userId) {
        Optional<User> userFound = userRepository.findById(userId);
        List<ChessClub> userChessClubs = new ArrayList<>();

        //falls User nicht vorhanden: leere Liste zurückgeben
        if (userFound.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(userChessClubs);
        }

        //alle Schachclubs anfordern und die, die den User als member enthalten, herausfiltern
        User user = userFound.get();
        List<ChessClubMembership> chessClubMemberships = chessClubMembershipRepository.findByMembershipUser(user);

        for (ChessClubMembership membership : chessClubMemberships) {
            ChessClub chessClub = membership.getMembershipChessclub();
            userChessClubs.add(chessClub);
        }

        return ResponseEntity.status(HttpStatus.OK).body(userChessClubs);
    }

    //3 zuletzt gespielte Partien
    public ResponseEntity<List<Object>> getLastGames(Long userId) {
        Optional<User> userFound = userRepository.findById(userId);

        if(userFound.isPresent()) {
            List<ChessGame> lastThreeGames = chessGameRepository.findLastThreeGamesByUserId(userId);
            List<ChessBot> lastThreeBotGames = chessBotRepository.findLastThreeBotGamesByUserId(userId);

            List<Object> lastGamesCombined = new ArrayList<>();
            lastGamesCombined.addAll(lastThreeGames);
            lastGamesCombined.addAll(lastThreeBotGames);

            List<TimeStampDTO> timeStampList = new ArrayList<>();

            for(Object game : lastGamesCombined) {
                if(game instanceof ChessGame) {
                    LocalDateTime timeStamp = ((ChessGame) game).getTimeStamp();
                    TimeStampDTO timeStampDTO = new TimeStampDTO(lastGamesCombined.indexOf(game), timeStamp);
                    timeStampList.add(timeStampDTO);
                }
                else
                {
                    //ChessBot Spiel
                    LocalDateTime timeStamp = ((ChessBot) game).getTimeStamp();
                    TimeStampDTO timeStampDTO = new TimeStampDTO(lastGamesCombined.indexOf(game), timeStamp);
                    timeStampList.add(timeStampDTO);
                }
            }

            Collections.sort(timeStampList,
                    (timeStamp1, timeStamp2) -> timeStamp2.getLocalDateTime().compareTo(timeStamp1.getLocalDateTime()));

            //timeStampList ist absteigend sortiert (zuletzt beendetes Spiel = index 0, ältestes Spiel = letzter Index)
            if(timeStampList.size()>3) {
                //Nur die IDs der max. 3 neuesten Spiele in der Liste timeStampList speichern
                timeStampList = timeStampList.subList(0, 3);
            }

            List<Object> returnList = new ArrayList<>();
            for(TimeStampDTO timeStampDTO : timeStampList) {
                returnList.add(lastGamesCombined.get(timeStampDTO.getIndexInList()));
            }

            return ResponseEntity.status(HttpStatus.OK).body(returnList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    //Finden eines Schachspiels anhand von userId sowie timestamp
    public ResponseEntity<ChessGame> findChessGame(Long userId, LocalDateTime timeStamp) {
        Optional<User> userFound = userRepository.findById(userId);
        if (userFound.isPresent()){
            Optional<ChessGame> chessGameFoundAsUser1 = chessGameRepository.findByUser1IdAndTimeStamp(userId, timeStamp);
            Optional<ChessGame> chessGameFoundAsUser2 = chessGameRepository.findByUser2IdAndTimeStamp(userId, timeStamp);
            if (chessGameFoundAsUser1.isPresent() || chessGameFoundAsUser2.isPresent()){
                if (chessGameFoundAsUser1.isPresent()){
                    //Schachspiel mit dem User als user1 im ChessGame sowie timestamp gefunden
                    return ResponseEntity.status(HttpStatus.OK).body(chessGameFoundAsUser1.get());
                }
                //Schachspiel mit dem User als user2 im ChessGame sowie timestamp gefunden
                return ResponseEntity.status(HttpStatus.OK).body(chessGameFoundAsUser2.get());
            }
            //User gefunden, aber kein beendetes Schachspiel zu der Zeit (sondern Botspiel)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        //User nicht gefunden
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    //Finden eines Botspiels anhand von userId sowie timestamp
    public ResponseEntity<ChessBot> findBotGame(Long userId, LocalDateTime timeStamp) {
        Optional<User> userFound = userRepository.findById(userId);
        if (userFound.isPresent()){
            Optional<ChessBot> botGameFound = chessBotRepository.findByPlayerIdAndTimeStamp(userId, timeStamp);
            if (botGameFound.isPresent()) {
                //Botspiel mit dem User sowie timestamp gefunden
                return ResponseEntity.status(HttpStatus.OK).body(botGameFound.get());
            }
            //User gefunden, aber kein beendetes Botspiel zu der Zeit (sondern Schachspiel)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        //User nicht gefunden
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


}