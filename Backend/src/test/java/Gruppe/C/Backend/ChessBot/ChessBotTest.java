package Gruppe.C.Backend.ChessBot;

import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ChessBotTest {

    private static ChessBotService chessBotService;
    private static UserRepository userRepository;
    private static ChessBotRepository chessBotRepository;

    @BeforeAll
    public static void mockDependencies() {

        chessBotRepository = mock(ChessBotRepository.class);
        userRepository = mock(UserRepository.class);
        chessBotService = new ChessBotService(userRepository, chessBotRepository);

    }

    @Test
    void createChessBot_invalidUser() {
        Long userId  = 1L;
        String name = "TestBot";
        byte level = 1;
        Integer timer = 100;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        ResponseEntity<Long> response = chessBotService.createGameWithBot(userId, name, level, timer);
        assertEquals(response, ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));

    }

    @Test
    void createChessBot_noName() {
        Long userId  = 1L;
        User player = new User(userId);
        String name = null;
        byte level = 1;
        Integer timer = 100;

        when(userRepository.findById(userId)).thenReturn(Optional.of(player));

        ResponseEntity<Long> response = chessBotService.createGameWithBot(userId, name, level, timer);
        assertEquals(response, ResponseEntity.status(HttpStatus.CONFLICT).body(null));

    }

    @Test
    void createChessBot_invalidLevel() {
        Long userId  = 1L;
        User player = new User(userId);
        String name = "TestBot";
        byte level = 4;
        Integer timer = 100;

        when(userRepository.findById(userId)).thenReturn(Optional.of(player));

        ResponseEntity<Long> response = chessBotService.createGameWithBot(userId, name, level, timer);
        assertEquals(response, ResponseEntity.status(HttpStatus.CONFLICT).body(null));

    }

    @Test
    void createChessBot_invalidTimer() {
        Long userId  = 1L;
        User player = new User(userId);
        String name = "TestBot";
        byte level = 1;
        Integer timer = -100;

        when(userRepository.findById(userId)).thenReturn(Optional.of(player));

        ResponseEntity<Long> response = chessBotService.createGameWithBot(userId, name, level, timer);
        assertEquals(response, ResponseEntity.status(HttpStatus.CONFLICT).body(null));

    }

    @Test
    void createChessBot_Working() {
        Long userId  = 1L;
        User player = new User(userId);
        String name = "TestBot";
        byte level = 2;
        Integer timer = 100;

        when(userRepository.findById(userId)).thenReturn(Optional.of(player));

        ResponseEntity<Long> response = chessBotService.createGameWithBot(userId, name, level, timer);
        assertEquals(response.getStatusCode(), HttpStatus.OK);

    }

}
