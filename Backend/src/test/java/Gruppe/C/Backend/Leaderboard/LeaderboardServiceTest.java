package Gruppe.C.Backend.Leaderboard;

import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


public class LeaderboardServiceTest {

    private static LeaderboardService leaderboardService;
    private static UserRepository userRepository;

    @BeforeAll
    public static void mockDependencies()
    {
        userRepository = mock(UserRepository.class);
        leaderboardService = new LeaderboardService(userRepository);
    }

    @Test
    public void getPlayersSortedByPoints() {

        User user1 = new User("Marie", "Musterfrau", "erikamusterfrau@gmx.de", 450);
        User user2 = new User("Max", "Mustermann", "maxmustermann@gmx.de", 600);
        User user3 = new User("Lena", "Muster", "lenamuster@gmx.de", 550);
        User user4 = new User("Robin", "Muster", "robinmuster@gmx.de", 650);
        User user5 = new User("Lars", "Muster", "larsmuster@gmx.de", 500);
        User user6 = new User("Lara", "Muster", "lenamuster@gmx.de", 600);

        //Anlegen einer Liste mit Testusern
        List<User> mockedUsers = new ArrayList<>();
        mockedUsers.add(user1);
        mockedUsers.add(user2);
        mockedUsers.add(user3);
        mockedUsers.add(user4);
        mockedUsers.add(user5);
        mockedUsers.add(user6);

        //bei Aufruf der .findAll() Methode Liste mockedUsers zurückgeben
        //Mocking der findAll-Methode des UserRepository, um die Liste mockedUsers zurückzugeben, wenn aufgerufen.
        when(userRepository.findAll()).thenReturn(mockedUsers);

        //Aufruf der Leaderboard Service Methode zum Sortieren der User
        List<User> sortedUserList = leaderboardService.getPlayersSortedByPoints();

        //Überprüfen, ob die Liste nicht null ist
        assertNotNull(sortedUserList);

        //Überprüfen, ob die sortedUserList 6 Elemente enthält
        assert(sortedUserList.size())==6;

        //Überprüfen, ob die Liste in absteigener Reihenfolge der Punkte der Users sortiert ist
        assert(sortedUserList.get(0)).equals(user4);
        assert(sortedUserList.get(1)).equals(user2);
        assert(sortedUserList.get(2)).equals(user6);
        assert(sortedUserList.get(3)).equals(user3);
        assert(sortedUserList.get(4)).equals(user5);
        assert(sortedUserList.get(5)).equals(user1);

    }
}


