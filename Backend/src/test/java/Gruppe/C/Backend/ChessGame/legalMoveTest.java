package Gruppe.C.Backend.ChessGame;

import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class legalMoveTest {
    /*@Mock
    private ChessGameRepository chessGameRepository;
    @Mock
    private ChessMoveRepository chessMoveRepository;
    @Mock
    private UserRepository userRepository;
    private AutoCloseable autoCloseable;
    private PlayChessGameService playChessGameServiceUnderTest;

    @BeforeEach
    void setUp(ChessGameRepository chessGameRepository){
        autoCloseable= MockitoAnnotations.openMocks(this);

        playChessGameServiceUnderTest = new PlayChessGameService(chessGameRepository,userRepository, chessMoveRepository);
    }
    @AfterEach
    void  tearDown() throws Exception{
        autoCloseable.close();
    }
    @Test
    void legalMovesShouldReturnListOfMoves(){
        User user1 = new User("Marie", "Musterfrau", "erikamusterfrau@gmx.de", 450);
        User user2 = new User("Max", "Mustermann", "maxmustermann@gmx.de", 600);
        ChessGame chessGame1 = new ChessGame(1L,user1,user2,"test",1000,1000,true,true,false,"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        //List<ChessGame> mockedChessGames = new ArrayList<>();
        //mockedChessGames.add(chessGame1);


        // Mocking behavior for your repository method
        when(chessGameRepository.findChessGameByChessGameId(1L)).thenReturn(chessGame1);
        String actualResult = playChessGameServiceUnderTest.legalMoves(1L).toString();




        // Define your expected result based on the mocked ChessGame list
        List<String> expectedMoves = Arrays.asList("[a2a3, a2a4, b2b3, b2b4, c2c3, c2c4, d2d3, d2d4, e2e3, e2e4, f2f3, f2f4, g2g3, g2g4, h2h3, h2h4, b1a3, b1c3, g1f3, g1h3]");
        String expectedResult = expectedMoves.toString();



        // Assert that the actual result matches the expected result
        assertEquals(expectedResult, actualResult);

    }
    */
}
