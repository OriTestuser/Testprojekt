package Gruppe.C.Backend.ChessGame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("chessgame")
@CrossOrigin("*") //Muss in alle Controller weil Frontend 8080 läuft
public class ChessGameController {
    @Autowired
    private ChessGameService chessGameService;

    public ChessGameController(ChessGameService chessGameService) { //Zugriff auf den ChessGameService, durch Instanz der Klasse UserService
        this.chessGameService = chessGameService;
    }


    //Einladung zu einer Schachpartie
    @PostMapping("/invite")
    public ResponseEntity<ChessGame> inviteToChessGame(@RequestParam("requesterId") Long requesterId, @RequestParam("invitedId") Long invitedId) {
        ResponseEntity<ChessGame> invitationResponse = chessGameService.inviteToChessGame(requesterId, invitedId);
        return invitationResponse;
    }

    @GetMapping("/findInvitation")
    public ResponseEntity<List<ChessGame>> findInvitation(@RequestParam("invitedUser") Long invitedUser){

        List<ChessGame> invitation = chessGameService.getInvitation(invitedUser);

        if(invitation != null) {
            return ResponseEntity.status(HttpStatus.OK).body(invitation);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    /*
    @PutMapping("/createChessGame")
    public ResponseEntity<Boolean>createChessGame(@RequestParam ("nameOfChessGame")String nameOfChessGame,@RequestParam ("timer") int timer ,@RequestParam ("userId1") Long userId2,@RequestParam("userId2") Long userId1){
        return ResponseEntity.ok(chessGameService.createChessGame(nameOfChessGame,timer,userId1,userId2));
    }*/

    //Spielsettings setzen
    @PutMapping("/createChessGame")
    public ResponseEntity<Boolean>createChessGame(@RequestParam ("nameOfChessGame") String nameOfChessGame, @RequestParam ("timer") Integer timer, @RequestParam ("chessGameId") Long chessGameId){
        return ResponseEntity.ok(chessGameService.createChessGame(nameOfChessGame, timer, chessGameId));
    }


    @PostMapping("/acceptedGameRequest")
    public ResponseEntity<Boolean> acceptGameRequest(@RequestParam ("requesterID") Long requesterId, @RequestParam ("invitedId") Long invitedId, @RequestParam ("chessGameId") Long chessGameId) {
        return ResponseEntity.ok(chessGameService.acceptGameRequest(requesterId, invitedId, chessGameId));
    }


    @DeleteMapping("/denyGameRequest/requesterid={requesterId}/invitedid={invitedId}/chessgameid={chessGameId}")
    public ResponseEntity<Boolean> denyGameRequest(@PathVariable Long requesterId, @PathVariable Long invitedId, @PathVariable Long chessGameId) {
        return ResponseEntity.ok(chessGameService.denyGameRequest(requesterId,invitedId, chessGameId));
    }
    @PostMapping("getExistingGames")
    public ResponseEntity<List<ChessGame>> getExistingGames (@RequestParam ("usertofind")Long userId){

        List<ChessGame> existingGames = chessGameService.getExistingGames(userId);

        if(existingGames != null) {
            return ResponseEntity.status(HttpStatus.OK).body(existingGames);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



    @GetMapping("/chooseOpponent")
    public ResponseEntity<List<ChessGame>> chooseOpponent(@RequestParam("userToChooseOpponent") Long userId){

        List<ChessGame> userInGame = chessGameService.chooseOpponent(userId);

        if(userInGame != null) {
            return ResponseEntity.status(HttpStatus.OK).body(userInGame);
        }

        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }
    @PutMapping("stopGame")
    public ResponseEntity<Boolean> stopGame(@RequestParam ("chessGameId") Long chessGameId, @RequestParam ("stoppingUser") Long stoppingUser) {
        return ResponseEntity.ok(chessGameService.leaveGame(chessGameId, stoppingUser));
    }
    //Todo: joinGame muss noch implemtiert werd hängt davon ab welche rückgabe werte ich bekomme
    @PutMapping("joinGame")
    public ResponseEntity<Boolean> joinGame(@RequestParam ("chessGameId") Long chessGameId, @RequestParam ("user") Long userId) {
        return ResponseEntity.ok(chessGameService.joinGame(chessGameId,userId));
    }
    @GetMapping("moveList")
    public ResponseEntity<List<String>> moveList(@RequestParam ("chessGameId") Long chessGameId){
        return ResponseEntity.ok(chessGameService.getMoveList(chessGameId));
    }




}
