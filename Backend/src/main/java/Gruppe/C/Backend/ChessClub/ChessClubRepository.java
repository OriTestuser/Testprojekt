package Gruppe.C.Backend.ChessClub;

import Gruppe.C.Backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ChessClubRepository extends JpaRepository<ChessClub, Long> {

    //einen Schachclub anhand des Namens finden
    Optional<ChessClub> findByChessClubName(String chessClubName);


    ChessClub findChessClubByChessClubName(String chessClubName);
}
