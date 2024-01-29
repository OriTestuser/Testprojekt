package Gruppe.C.Backend.ChessGame;

import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import com.github.bhlangonijr.chesslib.Board;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChessGameService {
    private final ChessGameRepository chessGameRepository;
    // Für Suche nach Usern Zugriff auf UserRespository nötig
    //für Einladungen Zugriff auf Userdaten nötig
    private final UserRepository userRepository;

    public ChessGameService(ChessGameRepository chessGameRepository, UserRepository userRepository) {
        this.chessGameRepository = chessGameRepository;
        this.userRepository = userRepository;
    }




    //Einladung zu einer Schachpartie
    public ResponseEntity<ChessGame> inviteToChessGame(Long requesterId, Long invitedId) {
        // Datenbankabfrage ausführen, um User zu finden
        Optional<User> requesterFound = userRepository.findById(requesterId);
        Optional<User> invitedFound = userRepository.findById(invitedId);

        //falls beide User gefunden wurden: ein Schachspiel mit beiden erstellen und dieses in der DB speichern
        if (invitedFound.isPresent() && requesterFound.isPresent()) {
            if(!requesterId.equals(invitedId)) {
                //Objekt mit User mit requesterId und User mit invitedId anlegen
                ChessGame chessGameInvitation = new ChessGame(requesterFound.get(), invitedFound.get());
                chessGameInvitation.setPgnTimeStamp(LocalDateTime.now());
                chessGameRepository.save(chessGameInvitation);
                //ok und die erfolgreich erstellte Einladung zurückgeben
                return ResponseEntity.status(HttpStatus.OK).body(chessGameInvitation);
            }
            else {
                //Einladung an sich selbst ausschließen; forbidden und null zurückgeben
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }
        }
        //falls einer der beiden User nicht gefunden werden konnte: not_Found und null zurückgeben
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public List<ChessGame> getInvitation (Long invitedId) {

        Optional<User> invitedUser = userRepository.findById(invitedId); //User mithilfe der übergebenen id finden

        if(invitedUser.isPresent()){
            return chessGameRepository.findByUser2IdAndAcceptedFalse(invitedId); //als eingelandener nutzer, wird man als user2 gespeichert
                                                                                 //einladung wurde noch nicht akzeptiert, daher nach accepted false suchen
        }

        return null;
    }

    /*
    public Boolean createChessGame(String nameOfChessGame,int timer , Long userId2, Long userId1) {
        User user = userRepository.getUserById(userId2);
        User user2 = userRepository.getUserById(userId1);
        ChessGame chessGame = chessGameRepository.findChessGameByUser1AndUser2(user, user2);
        chessGame.setTimer(timer);
        chessGame.setChessGameName(nameOfChessGame);
        chessGame.setStarted(true);
        chessGame.setInsideGameUser1(true);
        chessGameRepository.save(chessGame);

        return true;
    }
    */

    public Boolean createChessGame(String nameOfChessGame, Integer timer, Long chessGameId) {

        ChessGame chessGame = chessGameRepository.findChessGameByChessGameId(chessGameId);
        chessGame.setTimer(timer);
        chessGame.setTimerUser1(timer);
        chessGame.setTimerUser2(timer);
        chessGame.setChessGameName(nameOfChessGame);
        chessGame.setStarted(true);
        chessGame.setInsideGameUser1(true);

        chessGame.setBoardState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

        chessGameRepository.save(chessGame);

        return true;
    }


    public Boolean acceptGameRequest(Long requesterId, Long invitedId, Long chessGameId) {

        //überprüfen, ob schachspiel mit der chessgameid id in der db ist und ob beide user existieren
        if(userRepository.findById(requesterId).isPresent() && userRepository.findById(invitedId).isPresent() && chessGameRepository.findChessGameByChessGameId(chessGameId) != null) {

            User requesterUser = userRepository.getUserById(requesterId);
            User invitedUser = userRepository.getUserById(invitedId);
            ChessGame acceptedGame = chessGameRepository.findChessGameByUser1AndUser2AndChessGameId(requesterUser, invitedUser, chessGameId); //chessgame suchen
            acceptedGame.setAccepted(true);
            chessGameRepository.save(acceptedGame);

            return true;

        }

        return false;
    }

    public Boolean denyGameRequest(Long invitedId, Long requesterId, Long chessGameId) {

        if(userRepository.findById(requesterId).isPresent() && userRepository.findById(invitedId).isPresent() && chessGameRepository.findChessGameByChessGameId(chessGameId) != null) {

            User requesterUser = userRepository.getUserById(requesterId);
            User invitedUser = userRepository.getUserById(invitedId);
            ChessGame denyChessgame = chessGameRepository.findChessGameByUser1AndUser2AndChessGameId(requesterUser, invitedUser, chessGameId);
            chessGameRepository.delete(denyChessgame); //chessgame löschen
            return true;

        }

        return false;
    }

    public List<ChessGame> chooseOpponent(Long userId) {

        Optional<User> foundUser = userRepository.findById(userId);

        if(foundUser.isPresent()) {

            //Liste der Spieler, die der User angefragt hat, die auch angenommen wurden
            //liste mit allen schachspielen, die angenommen, aber nicht gestartet wurden
            List<ChessGame> acceptedUser = chessGameRepository.findByUser1IdAndAcceptedTrueAndStartedFalse(userId);

            return acceptedUser;
        }

        return null;
    }


    public List<ChessGame> getExistingGames(Long userId) {


        List<ChessGame> getExsitingGames1 = chessGameRepository.findByUser1IdAndAcceptedTrueAndStartedTrueAndFinishedFalse(userId);
        List<ChessGame> getExsitingGames2 = chessGameRepository.findByUser2IdAndAcceptedTrueAndStartedTrueAndFinishedFalse(userId);

        getExsitingGames1.addAll(getExsitingGames2);



        if(getExsitingGames1 != null){
            return getExsitingGames1;
        }

        return null;

    }

    public Boolean leaveGame(Long ChessGameId, Long stoppingUser) {


        ChessGame chessGame = chessGameRepository.findChessGameByChessGameId(ChessGameId);
        if(stoppingUser==chessGame.getUser1().getId()){
            chessGame.setInsideGameUser1(false);
            chessGameRepository.save(chessGame);
            return true;
        }
        if(stoppingUser==chessGame.getUser2().getId()){
            chessGame.setInsideGameUser2(false);
            chessGameRepository.save(chessGame);
            return true;
        }



        //Todo: timer muss noch gestoppt werden wahrscheinlich abhängig davon ob ich grad am zub bin oder ihn noch machen muss


        return false;
    }

    public Boolean joinGame(Long chessGameId, Long userId) {
        ChessGame chessGame = chessGameRepository.findChessGameByChessGameId(chessGameId);
        if(userId==chessGame.getUser1().getId()) {
            chessGame.setInsideGameUser1(true);
            chessGameRepository.save(chessGame);
            return true;

        }
        if(userId==chessGame.getUser2().getId()){
            chessGame.setInsideGameUser2(true);
            chessGameRepository.save(chessGame);
            return true;
        }
        return false;
    }

    public List<String> getMoveList(Long chessGameId) {
        ChessGame chessGame = chessGameRepository.findChessGameByChessGameId(chessGameId);
        return chessGame.getMoveList();
    }
}
