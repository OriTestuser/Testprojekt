package Gruppe.C.Backend.ChessBot;

import Gruppe.C.Backend.ChessGame.PGNDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("chessBot")
@CrossOrigin("*")
public class ChessBotController {

    private final ChessBotService chessBotService;

    public ChessBotController(ChessBotService chessBotService) {
        this.chessBotService = chessBotService;
    }

    @PostMapping("/createGameWithBot")
    public ResponseEntity<Long> createGameWithBot (@RequestParam("userId") Long userId, @RequestParam("gameName") String gameName, @RequestParam("gameLevel") byte gameLevel, @RequestParam("timer") Integer timer) {
        return chessBotService.createGameWithBot(userId, gameName, gameLevel, timer);
    }

    @PutMapping("/makeMove")
    public ResponseEntity<Boolean> makeMove(@RequestParam("chessBotId") Long chessBotId, @RequestParam("moveUser") String moveUser) {
        return chessBotService.makeMove(chessBotId, moveUser);
    }


    // BestMove is an Object that contains the Move of the Bot as a String and the FEN from the Board
    @PutMapping("/botMove")
    public ResponseEntity<MoveDTO> botMove (@RequestParam("chessBotId") Long chessBotId) {
        return chessBotService.botMove(chessBotId);
    }

    // AssistantBot for User
    @PutMapping("/getBestMoveGameWithBot")
    public ResponseEntity<MoveDTO> getBestMoveGameWithBot(@RequestParam("chessBotId") Long chessBotId, @RequestParam("userId") Long userId) {
        return chessBotService.getBestMoveGameWithBot(chessBotId, userId);
    }

    @GetMapping("/legalMoves")
    public ResponseEntity<List<String>> legalMoves(@RequestParam("chessBotId") Long chessBotId) {
        return chessBotService.legalMoves(chessBotId);
    }

    //List of all Bot Games
    @GetMapping("/chessBotGames")
    public ResponseEntity<List<ChessBot>> chessBotGames(@RequestParam("userId") Long userId){
        return chessBotService.chessBotGames(userId);
    }

    @PutMapping("/leaveGame")
    public ResponseEntity<Boolean> leaveGame(@RequestParam("chessBotId") Long chessBotId) {
        return chessBotService.leaveGame(chessBotId);
    }

    @PutMapping("/rejoinGame")
    public ResponseEntity<Boolean> rejoinGame(@RequestParam("chessBotId") Long chessBotId) {
        return chessBotService.rejoinGame(chessBotId);
    }

    @GetMapping("/exportPGN")
    public ResponseEntity<PGNDTO> exportPGN(@RequestParam("chessBotId")Long chessBotId){
        return ResponseEntity.ok(chessBotService.convertToPgnFormat(chessBotId));
    }

    @PostMapping("/SEN")
    public  ResponseEntity<Boolean> senNotation (@RequestParam("chessBotId") Long chessBotId, @RequestParam("SEN") String sen){
        return ResponseEntity.ok(chessBotService.senNotation(chessBotId, sen));
    }

    @PutMapping("/surrender")
    public ResponseEntity<Boolean> surrender(@RequestParam("chessBotId") Long chessBotId) {
        return chessBotService.surrender(chessBotId);
    }

    @PutMapping("/updateTimer")
    public ResponseEntity<Boolean> updateTimer(@RequestParam("timer") Integer timer, @RequestParam("chessBotId") Long chessBotId) {
        return chessBotService.updateTimer(timer, chessBotId);
    }

    @PutMapping("/endIfTimerExpired")
    public ResponseEntity<Boolean> endIfTimerExpired(@RequestParam("chessBotId") Long chessBotId) {
        return chessBotService.endIfTimerExpired(chessBotId);
    }

}
