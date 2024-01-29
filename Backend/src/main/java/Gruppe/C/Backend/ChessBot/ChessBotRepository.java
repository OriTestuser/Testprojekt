package Gruppe.C.Backend.ChessBot;

import Gruppe.C.Backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChessBotRepository extends JpaRepository<ChessBot, Long> {
    ChessBot findByChessBotId (Long chessBotId);

    List<ChessBot> findChessBotByPlayerAndFinishedFalse(User user);

    //für Spielhistorie
    @Query("SELECT chessBotGames FROM ChessBot chessBotGames WHERE chessBotGames.finished = true AND chessBotGames.player.id = :userId ORDER BY chessBotGames.timeStamp DESC LIMIT 3")
    List<ChessBot> findLastThreeBotGamesByUserId(@Param("userId") Long userId);



    //BotGame anhand der userId (entweder in User1 oder User2 gespeichert) sowie der timeStamp finden
    Optional<ChessBot> findByPlayerIdAndTimeStamp(Long userId, LocalDateTime timeStamp);


}
