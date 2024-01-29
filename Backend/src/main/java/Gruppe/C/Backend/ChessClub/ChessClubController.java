package Gruppe.C.Backend.ChessClub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("chessclub")
@CrossOrigin("*")
public class ChessClubController {

    private final ChessClubService chessClubService;

    @Autowired
    public ChessClubController(ChessClubService chessClubService) {
        this.chessClubService = chessClubService;
    }

    //Erstellen eines Schachclubs
    @PostMapping("/create")
    public ResponseEntity<ChessClub> createChessClub(@RequestParam("chessClubName") String chessClubName, @RequestParam("erstellerUserId") Long erstellerUserId) {
        return chessClubService.createChessClub(chessClubName, erstellerUserId);
    }


    //Beitreten in einen Schachclub
    @PutMapping("/joinChessClub")
    public ResponseEntity<ChessClubMembership> joinChessClub(@RequestParam("chessClubName") String chessClubName, @RequestParam("requesterUserId") Long requesterUserId) {
        return chessClubService.joinChessClub(chessClubName, requesterUserId);
    }


    //Liste aller Schachclubs
    @GetMapping("/showChessClubs")
    public ResponseEntity<List<ChessClub>> showChessClubs() {

        return chessClubService.showChessClubs();
    }


}

