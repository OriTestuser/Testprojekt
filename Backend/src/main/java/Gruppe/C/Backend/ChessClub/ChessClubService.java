package Gruppe.C.Backend.ChessClub;

import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChessClubService {

    private final UserRepository userRepository;
    private final ChessClubRepository chessClubRepository;
    private final ChessClubMembershipRepository chessClubMembershipRepository;

    public ChessClubService(UserRepository userRepository, ChessClubRepository chessClubRepository, ChessClubMembershipRepository chessClubMembershipRepository) {
        this.userRepository = userRepository;
        this.chessClubRepository = chessClubRepository;
        this.chessClubMembershipRepository = chessClubMembershipRepository;
    }


    //Schachclub erstellen
    public ResponseEntity<ChessClub> createChessClub(String chessClubName, Long erstellerUserId) {
        //Ersteller finden
        Optional<User> userFound = userRepository.findById(erstellerUserId);
        if (userFound.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        //prüfen, ob es bereits einen Schachclub mit dem Namen gibt
        //falls ja HTTP Status Conflict und null zurückgeben
        Optional<ChessClub> neuerSchachclub = chessClubRepository.findByChessClubName(chessClubName);
        if(neuerSchachclub.isPresent()) {
            //Schachclub darf nicht erstellt werden
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        ChessClub meinSchachclub = new ChessClub(chessClubName);
        meinSchachclub = chessClubRepository.save(meinSchachclub);

        //Ersteller als Mitglied hinzufügen
        ChessClubMembership membership = new ChessClubMembership(userFound.get(), meinSchachclub);
        chessClubMembershipRepository.save(membership);

        return ResponseEntity.status(HttpStatus.OK).body(meinSchachclub);
    }


    //Beitreten in einen Schachclub
    public ResponseEntity<ChessClubMembership> joinChessClub(String chessClubName, Long requesterUserId) {
        //ChessClub und requesterUser finden
        Optional<ChessClub> chessClubFound = chessClubRepository.findByChessClubName(chessClubName);
        Optional<User> userFound = userRepository.findById(requesterUserId);

        if(chessClubFound.isEmpty() || userFound.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Prüfen, ob der User bereits Mitglied im Schachclub ist
        Optional<ChessClubMembership> existingMembership = chessClubMembershipRepository.findByMembershipUserAndMembershipChessclub(userFound.get(), chessClubFound.get());
        if(existingMembership.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        //neue Mitgliedschaft im Schachclub erstellen
        ChessClubMembership newMembership = new ChessClubMembership(userFound.get(), chessClubFound.get());
        chessClubMembershipRepository.save(newMembership);
        return ResponseEntity.status(HttpStatus.OK).body(newMembership);
    }


    //Liste aller Schachclubs
    public ResponseEntity<List<ChessClub>> showChessClubs() {
        List<ChessClub> allChessClubs = chessClubRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(allChessClubs);
    }


    public Set<User> getMembersByChessClub(ChessClub chessClub) {

        List<ChessClubMembership> chessClubMemberships = chessClubMembershipRepository.findByMembershipChessclub(chessClub);
        Set<User> members = new HashSet<>();

        for(ChessClubMembership membership : chessClubMemberships){
            members.add(membership.getMembershipUser());
        }

        return members;
    }


}
