package Gruppe.C.Backend.Streaming;


import Gruppe.C.Backend.ChessGame.ChessGame;
import Gruppe.C.Backend.ChessPuzzle.ChessPuzzle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("stream")
@CrossOrigin("*")
public class StreamingController {

    @Autowired
    private StreamingService streamingService;

    //Live Stream starten
    @PostMapping("/start")
    public ResponseEntity<ChessGame> startStream(@RequestParam Long chessGameId, @RequestParam Long userId) {
        return streamingService.startStream(chessGameId, userId);
    }

    //Liste aller Live Streams
    @GetMapping("/showStreams")
    public ResponseEntity<List<ChessGame>> showStreams() {
        return streamingService.showStreams();
    }

    //Abfrage des Spielstands
    @GetMapping("/getChessGameState")
    public ResponseEntity<ChessGame> getChessGameState(@RequestParam Long chessGameId) {
        return streamingService.getChessGameState(chessGameId);
    }
}
