package Gruppe.C.Backend.Leaderboard;


import Gruppe.C.Backend.User.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("leaderboard")
@CrossOrigin("*")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;


    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    //Anzeigen des Leaderboards
    @GetMapping("/showLeaderboard")
    public ResponseEntity<List<User>> getLeaderboard () {
        List<User> bestPlayers = leaderboardService.getPlayersSortedByPoints();
        return ResponseEntity.status(HttpStatus.OK).body(bestPlayers);
    }

}

