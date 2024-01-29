package Gruppe.C.Backend.ChessPuzzle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ChessPuzzleRepository extends JpaRepository<ChessPuzzle, CompositeChessPuzzleKey> {

    //für Schachpuzzle
    //ChessPuzzle findChessPuzzleByPuzzleNumber (Long puzzleNumber);

    Optional<ChessPuzzle> findChessPuzzleByPuzzleId(Long puzzleId);

    //Liste mit Schachpuzzle Daten (puzzleId, FEN sowie moves) für Schachpuzzle eines Users
    @Query("SELECT p.puzzleId, p.chessPuzzleStatusFEN, p.moves FROM ChessPuzzle p WHERE p.player.id = :userId")
    List<Object[]> getPuzzleInfoByUserId(@Param("userId") Long userId);

}
