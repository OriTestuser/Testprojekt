package Gruppe.C.Backend.Streaming;

import Gruppe.C.Backend.ChessGame.ChessGame;
import Gruppe.C.Backend.ChessGame.ChessGameRepository;
import Gruppe.C.Backend.ChessGame.ChessGameService;
import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StreamingService {
    private final ChessGameRepository chessGameRepository;
    private final UserRepository userRepository;

    public StreamingService(ChessGameRepository chessGameRepository, UserRepository userRepository) {
        this.chessGameRepository = chessGameRepository;
        this.userRepository = userRepository;
    }


    //Live Stream starten
    public ResponseEntity<ChessGame> startStream(Long chessGameId, Long userId) {
        Optional<ChessGame> chessGameFound = chessGameRepository.findGameByChessGameId(chessGameId);
        Optional<User> userFound = userRepository.findById(userId);

        if (chessGameFound.isPresent() && userFound.isPresent()) {
            if(chessGameFound.get().getUser1().getId() == userFound.get().getId() || chessGameFound.get().getUser2().getId() == userFound.get().getId()) {
                //Starten des Livestreams nur für Spieler des ChessGames erlauben
                chessGameFound.get().setLivestreamActive(true);
                chessGameRepository.save(chessGameFound.get());
                return ResponseEntity.status(HttpStatus.OK).body(chessGameFound.get());
            }
            else {
                //userId ist kein Spieler des ChessGames
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }
        }
        else {
            //chessGameId oder userId nicht gefunden
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //Liste aller Live Streams
    public ResponseEntity<List<ChessGame>> showStreams() {
        List<ChessGame> allStreams = chessGameRepository.findByFinishedFalseAndLivestreamActiveTrue();
        return ResponseEntity.status(HttpStatus.OK).body(allStreams);
    }

    //Abfrage des Spielstands
    public ResponseEntity<ChessGame> getChessGameState(Long chessGameId) {
        Optional<ChessGame> chessGameFound = chessGameRepository.findGameByChessGameId(chessGameId);

        if (chessGameFound.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(chessGameFound.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
