package Gruppe.C.Backend.ChessPuzzle;

import Gruppe.C.Backend.ChessClub.ChessClub;
import Gruppe.C.Backend.User.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("chessPuzzle")
@CrossOrigin("*")
public class ChessPuzzleController {

    private final ChessPuzzleService chessPuzzleService;
    public ChessPuzzleController(ChessPuzzleService chessPuzzleService) {
        this.chessPuzzleService = chessPuzzleService;
    }

    @PostMapping("/importChessPuzzle")
    public ResponseEntity<Boolean> importChessPuzzle(@RequestParam("chessPuzzleId") String chessPuzzleId, @RequestParam("fen") String fen, @RequestParam("moves") String moves, @RequestParam("playerId") Long playerId) {
        return chessPuzzleService.importChessPuzzle(chessPuzzleId, fen, moves, playerId);
    }

    /*@PostMapping("/importChessPuzzle")
    public ResponseEntity<List<List<String>>> importChessPuzzle(@RequestParam("filePath") String filePath, @RequestParam("playerId") Long playerId) {
        //TODO in Frontend: change "\" in FilePath to "/"
        //Postman entfernt die "" beim Pfad nicht, daher Substring
        //String subString = filePath.substring(1, filePath.length()-1);
        //Falls decodieren des Strings in Postman nicht funktioniert
        String decodedFileName = URLDecoder.decode(filePath, StandardCharsets.UTF_8);
        System.out.println(decodedFileName);
        return chessPuzzleService.importChessPuzzle(decodedFileName, playerId);
    }

     */


    //Lösen eines Schachpuzzles
    @PutMapping("/solve")
    public ResponseEntity<Boolean> solveChessPuzzle(@RequestParam("puzzleId") Long puzzleId, @RequestParam("userId") Long userId, @RequestParam("madeMove") String madeMove) {
        return chessPuzzleService.solveChessPuzzle(puzzleId, userId, madeMove);
    }

    //Liste aller Schachpuzzle
    @GetMapping("/get")
    public ResponseEntity<List<ChessPuzzle>> getChessPuzzles() {

        return chessPuzzleService.getChessPuzzles();
    }

    //Schachpuzzle Daten (puzzleId, FEN sowie moves) für Schachpuzzle eines Users
    @GetMapping("/getData")
    public ResponseEntity<List<Object[]>> getPuzzleDataByUserId(@RequestParam("userId") Long userId) {
        List<Object[]> puzzleInfo = chessPuzzleService.getPuzzleInfoByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(puzzleInfo);
    }


}
