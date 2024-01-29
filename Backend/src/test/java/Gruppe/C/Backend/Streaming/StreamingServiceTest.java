package Gruppe.C.Backend.Streaming;

import Gruppe.C.Backend.ChessGame.ChessGame;
import Gruppe.C.Backend.ChessGame.ChessGameRepository;
import Gruppe.C.Backend.Leaderboard.LeaderboardService;
import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class StreamingServiceTest {
    private static StreamingService streamingService;
    private static ChessGameRepository chessGameRepository;
    private static UserRepository userRepository;

    @BeforeAll
    public static void mockDependencies()
    {
        chessGameRepository = mock(ChessGameRepository.class);
        userRepository = mock(UserRepository.class);
        streamingService = new StreamingService(chessGameRepository, userRepository);
    }

    @Test
    void startStreamTest_InvalidChessGameId() {
        Long chessGameId = 1L;
        Long userId = 2L;
        User user = new User(userId);

        when(chessGameRepository.findGameByChessGameId(chessGameId)).thenReturn(Optional.empty());
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        ResponseEntity<ChessGame> response = streamingService.startStream(chessGameId, userId);
        assertEquals(response, ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @Test
    void startStreamTest_InvalidUserId() {
        Long chessGameId = 1L;
        Long userId = 2L;
        ChessGame chessGame = new ChessGame();

        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        when(chessGameRepository.findGameByChessGameId(chessGameId)).thenReturn(Optional.of(chessGame));

        ResponseEntity<ChessGame> response = streamingService.startStream(chessGameId, userId);
        assertEquals(response, ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @Test
    void startStreamTest_UserIdIsNoPlayerInChessGame() {
        Long chessGameId = 1L;
        Long userId1 = 1L;
        Long userId2 = 2L;
        Long userId3 = 3L;
        User user1 = new User(userId1);
        User user2 = new User(userId2);
        User user3 = new User(userId3);

        ChessGame chessGame = new ChessGame(user1, user2);

        when(chessGameRepository.findGameByChessGameId(chessGameId)).thenReturn(Optional.of(chessGame));
        when(userRepository.findById(userId3)).thenReturn(Optional.of(user3));

        ResponseEntity<ChessGame> response = streamingService.startStream(chessGameId, userId3);
        assertEquals(response, ResponseEntity.status(HttpStatus.FORBIDDEN).body(null));
    }

    @Test
    void startStreamTest_Working() {
        Long chessGameId = 1L;
        Long userId1 = 1L;
        Long userId2 = 2L;
        User user1 = new User(userId1);
        User user2 = new User(userId2);
        ChessGame chessGame = new ChessGame(user1, user2);

        when(chessGameRepository.findGameByChessGameId(chessGameId)).thenReturn(Optional.of(chessGame));

        when(userRepository.findById(userId1)).thenReturn(Optional.of(user1));
        ResponseEntity<ChessGame> response1 = streamingService.startStream(chessGameId, userId1);
        assertEquals(response1, ResponseEntity.status(HttpStatus.OK).body(chessGame));


        when(userRepository.findById(userId2)).thenReturn(Optional.of(user2));
        ResponseEntity<ChessGame> response2 = streamingService.startStream(chessGameId, userId2);
        assertEquals(response2, ResponseEntity.status(HttpStatus.OK).body(chessGame));
    }
}