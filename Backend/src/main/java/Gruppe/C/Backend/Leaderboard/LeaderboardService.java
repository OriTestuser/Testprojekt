package Gruppe.C.Backend.Leaderboard;

import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;

@Service
public class LeaderboardService {

    private final UserRepository userRepository;

    public LeaderboardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    //Leaderboard mit den besten Playern anzeigen
    public List<User> getPlayersSortedByPoints() {
        //Liste mit allen Spielern
        List<User> allPlayers = userRepository.findAll();

        //Liste allPlayers absteigend sortieren
        //Quelle: https://stackoverflow.com/questions/2784514/sort-arraylist-of-custom-objects-by-property
        //answered May 6, 2010 at 21:18 Michael Myers
        Collections.sort(allPlayers,
                (user2, user1) -> Integer.compare(user1.getPoints(), user2.getPoints()));

        return allPlayers;
    }
}
