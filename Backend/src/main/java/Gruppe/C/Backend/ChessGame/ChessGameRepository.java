package Gruppe.C.Backend.ChessGame;

import Gruppe.C.Backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChessGameRepository extends JpaRepository<ChessGame, CompositeChessGameKey> {
    //Spiele anhand von userId finden, sowohl für user1.id als auch user2.id
    List<ChessGame> findByUser1Id(@Param("id") Long userId);
    List<ChessGame> findByUser2Id(@Param("id") Long userId);

    //für Liste zu angenommenen Spiele
    //Liste der angenommenen Spiele, die ein User angefragt hat, zurückgeben
    List<ChessGame> findByUser1IdAndAcceptedTrue(@Param("id") Long userId);
    //Liste der angenommenen Spiele, die ein User akzeptiert hat, zurückgeben
    List<ChessGame> findByUser2IdAndAcceptedTrue(@Param("id") Long userId);

    List<ChessGame> findByUser1IdAndAcceptedFalse(@Param("id") Long userId);

    List<ChessGame> findByUser2IdAndAcceptedFalse(@Param("id") Long userId);

    ChessGame findChessGameByUser1AndUser2 (User user1, User user2);

    ChessGame findChessGameByUser1AndUser2AndChessGameId (User user1, User user2, Long chessGameId);

    //List <ChessGame> findInvitation (@Param("id") Long invitedId);
    List<ChessGame> findByUser1IdAndStartedTrue(@Param("id") Long userId);
    List<ChessGame> findByUser2IdAndStartedTrue(@Param("id") Long userId);

    ChessGame findChessGameByChessGameId(Long chessGameId);



    List<ChessGame> findByUser1IdAndAcceptedTrueAndStartedFalse(@Param("id") Long userId);

    List<ChessGame> findByUser1IdAndAcceptedTrueAndStartedTrue(Long userId);

    List<ChessGame> findByUser2IdAndAcceptedTrueAndStartedTrue(Long userId);

    List<ChessGame> findByUser1IdAndAcceptedTrueAndStartedTrueAndFinishedFalse(Long userId);

    List<ChessGame> findByUser2IdAndAcceptedTrueAndStartedTrueAndFinishedFalse(Long userId);

    //ChessGame findChessGameByUser1AndUser2(Long userId1, Long userId2);

    Optional<ChessGame> findGameByChessGameId(Long chessGameId);

    List<ChessGame> findByFinishedFalseAndLivestreamActiveTrue();


    //letzte drei Spiele eines Users anhand der timeStamp finden
    @Query("SELECT game FROM ChessGame game WHERE game.finished = true AND (game.user1.id = :userId OR game.user2.id = :userId) ORDER BY game.timeStamp DESC LIMIT 3")
    List<ChessGame> findLastThreeGamesByUserId(@Param("userId") Long userId);


    //ChessGame anhand der userId (user als User1 gespeichert) sowie der timeStamp finden
    Optional<ChessGame> findByUser1IdAndTimeStamp(Long userId, LocalDateTime timeStamp);

    //ChessGame anhand der userId (user als User2 gespeichert) sowie der timeStamp finden
    Optional<ChessGame> findByUser2IdAndTimeStamp(Long userId, LocalDateTime timeStamp);
}
