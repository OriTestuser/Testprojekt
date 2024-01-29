package Gruppe.C.Backend.ChessGame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/PlayChessGame")
@CrossOrigin("*")


public class PlayChessGameController {
    @Autowired
    private PlayChessGameService playChessGameService;

    public PlayChessGameController(PlayChessGameService playChessGameService) {
        this.playChessGameService = playChessGameService;
    }

    @PutMapping("/makeMove")//4
    public ResponseEntity<Boolean> makeMove(@RequestParam ("move") String move,@RequestParam ("chessGameId") Long chessGameId){
        return ResponseEntity.ok(playChessGameService.makeMove(move,chessGameId));
    }
    @GetMapping("/legalMove")//2
    public  ResponseEntity<List<String>> legalMoves(@RequestParam ("chessGameId") Long chessGameId){
        return  ResponseEntity.ok(playChessGameService.legalMoves(chessGameId));
    }
    @PutMapping("/checkMate")//3
    public  ResponseEntity<Boolean> checkMate(@RequestParam ("chessGameId") Long chessGameId,@RequestParam ("winnerId")Long winnerId,@RequestParam("loserId")Long loserId){
        return ResponseEntity.ok(playChessGameService.checkMate(chessGameId,winnerId,loserId));
    }
    @GetMapping("/draw") //1
    public ResponseEntity<Boolean> draw(@RequestParam ("chessGameId") Long chessGameId) {
        return ResponseEntity.ok(playChessGameService.draw(chessGameId));
    }
    @GetMapping("/FEN")
    public ResponseEntity<List<String>> fen(@RequestParam ("chessGameId") Long chessGameId) {

        return ResponseEntity.ok(playChessGameService.fen(chessGameId));
    }
    @GetMapping("/Timer")
    public ResponseEntity<Integer> getTimer(@RequestParam ("chessGameId") Long chessGameId,@RequestParam("whitheOrBlack") String whitheOrBlack){
        return ResponseEntity.ok(playChessGameService.timer(chessGameId,whitheOrBlack));
    }
    @GetMapping("/getFinished")
    public ResponseEntity<Boolean> getFinished(@RequestParam ("chessGameId") Long chessGameId){
        return ResponseEntity.ok(playChessGameService.getFinished(chessGameId));
    }
    @PutMapping("/surrender")
        public ResponseEntity<Boolean> surrender(@RequestParam ("chessGameId") Long chessGameId,@RequestParam ("winnerId")Long winnerId,@RequestParam("loserId")Long loserId){
        return ResponseEntity.ok(playChessGameService.surrender(chessGameId,winnerId,loserId));
        }


    //Assistentenbot
    @PutMapping("/assistant")
    public ResponseEntity<BestMoveDTO> getBestMove(@RequestParam("chessGameId") Long chessGameId, @RequestParam("userId") Long userId) {
        return playChessGameService.getBestMove(chessGameId, userId);
    }


    @GetMapping("/exportPGN")
    public  ResponseEntity<PGNDTO> exportPGN(@RequestParam("chessGameId")Long chessGameId){
        return ResponseEntity.ok(playChessGameService.convertToPgnFormat(chessGameId));
    }

    @PostMapping("/SEN")
    public  ResponseEntity<Boolean> senNotation (@RequestParam("chessGameId") Long chessGameId, @RequestParam("SEN") String sen){
        return ResponseEntity.ok(playChessGameService.senNotation(chessGameId,sen));
    }

}
