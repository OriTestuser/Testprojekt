package Gruppe.C.Backend.ChessPuzzle;

import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import Gruppe.C.Backend.ChessGame.PlayChessGameService;
import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.move.Move;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import com.rahul.stockfish.Stockfish;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeoutException;


@Service
public class ChessPuzzleService {

    private final ChessPuzzleRepository chessPuzzleRepository;
    private final UserRepository userRepository;

    private final PlayChessGameService playChessGameService;

    public ChessPuzzleService(ChessPuzzleRepository chessPuzzleRepository, UserRepository userRepository, PlayChessGameService playChessGameService) throws IOException, TimeoutException {
        this.chessPuzzleRepository = chessPuzzleRepository;
        this.userRepository = userRepository;
        this.playChessGameService = playChessGameService;
    }

    public ResponseEntity<Boolean> importChessPuzzle(String chessPuzzleId, String fen, String moves, Long playerId) {

        if(userRepository.findById(playerId).isPresent()) {

                ChessPuzzle chessPuzzle = new ChessPuzzle();
                chessPuzzle.setChessPuzzleId(chessPuzzleId);
                chessPuzzle.setChessPuzzleStatusFEN(fen);
                chessPuzzle.setMoves(moves);
                chessPuzzle.setPlayer(userRepository.getUserById(playerId));
                chessPuzzleRepository.save(chessPuzzle);

                System.out.println("Chesspuzzle is saved in the Database");
                return ResponseEntity.status(HttpStatus.OK).body(true);

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
    }


   /* public Long checkPuzzleNumber () {
        Long number = 1L;
        while(chessPuzzleRepository.findChessPuzzleByPuzzleNumber(number) != null) {
            number++;
        }
        return number;
    }

    public ResponseEntity<List<List<String>>> importChessPuzzle(String filePath, Long playerId){

        List<List<String>> allChessPuzzle = new ArrayList<>();
        Long puzzleNumber = 0L;
        int index1 = 1;
        int index2 = 2;
        User activeUser = userRepository.getUserById(playerId);

       try {
            System.out.println("Aktuelles Arbeitsverzeichnis: " + System.getProperty("user.dir"));
            CSVReader reader = new CSVReader(new FileReader(filePath));
            List<String[]> puzzle = reader.readAll();
                for (String[] row : puzzle) {
                    List<String> puzzleList = new ArrayList<>();
                    ChessPuzzle chessPuzzle = new ChessPuzzle();
                    String fen = row[index1];
                    String move = row[index2];
                    puzzleList.add(fen);
                    puzzleList.add(move);
                    if(chessPuzzleRepository.findChessPuzzleByPuzzleNumber(1L) != null) {
                        puzzleNumber = checkPuzzleNumber();
                        chessPuzzle.setPuzzleNumber(puzzleNumber);
                    }
                    else{
                        puzzleNumber = 1L;
                        chessPuzzle.setPuzzleNumber(puzzleNumber);
                    }
                    chessPuzzle.setPlayer(activeUser);
                    chessPuzzle.setPuzzleData(puzzleList);
                    chessPuzzleRepository.save(chessPuzzle);
                    System.out.println(puzzleList.toString());
                    allChessPuzzle.add(puzzleList);
                }



           System.out.println(allChessPuzzle.toString());
           return ResponseEntity.status(HttpStatus.OK).body(allChessPuzzle);


       }
        catch (IOException | CsvException e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);



    }

    */

    //Lösen eines Schachpuzzles
    public ResponseEntity<Boolean> solveChessPuzzle(Long puzzleId, Long userId, String madeMove) {
        Optional<ChessPuzzle> chessPuzzleFound = chessPuzzleRepository.findChessPuzzleByPuzzleId(puzzleId);
        Optional<User> userFound = userRepository.findById(userId);
        if (chessPuzzleFound.isPresent() && userFound.isPresent()) {
            String puzzleStartStatusFEN = chessPuzzleFound.get().getChessPuzzleStatusFEN();
            String bestMove = chessPuzzleFound.get().getbestMove(chessPuzzleFound.get().getMoves());

            if (checkMadeMove(puzzleId, madeMove)) {
                if (madeMove.equals(bestMove)) {
                    if(!chessPuzzleFound.get().isSolved()) {
                        chessPuzzleFound.get().setSolved(true);
                        userFound.get().setNumberOfSolvedChessPuzzles(userFound.get().getNumberOfSolvedChessPuzzles() + 1);
                        chessPuzzleRepository.save(chessPuzzleFound.get());
                        userRepository.save(userFound.get());

                        return ResponseEntity.status(HttpStatus.OK).body(true);
                    }
                    // Chesspuzzle bereits gelöst; erneute Lösung korrekt, aber ohne Erhöhen der Anzahl gelöster ChessPuzzles
                    return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(true);
                }
                //gespielter Move != bester Move
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
            }
            // Move nicht legal
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
        }
        // Chesspuzzle oder User nicht gefunden
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
    }

    public Boolean checkMadeMove(Long puzzleId, String madeMove) {
        Optional<ChessPuzzle> chessPuzzleFound = chessPuzzleRepository.findChessPuzzleByPuzzleId(puzzleId);
        Board board = new Board();

        if (chessPuzzleFound.isPresent()) {
            board.loadFromFen(chessPuzzleFound.get().getChessPuzzleStatusFEN());
            List<Move> legalMoves = board.legalMoves();
            Move move = null;

            for (Move legalMove : legalMoves) {
                if (legalMove.toString().equals(madeMove)) {
                    move = legalMove;
                    break;
                }
            }

            if (madeMove != null) {
                return true;
            }
            else {
                return false;
            }

        }
        //ChessPuzzle not found
        return false;
    }

    //Liste aller Schachpuzzle
    public ResponseEntity<List<ChessPuzzle>> getChessPuzzles() {
        List<ChessPuzzle> allChessPuzzles = chessPuzzleRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(allChessPuzzles);
    }

    //Schachpuzzle Daten (puzzleId, FEN sowie moves) für Schachpuzzle eines Users
    public List<Object[]> getPuzzleInfoByUserId(Long userId) {
        return chessPuzzleRepository.getPuzzleInfoByUserId(userId);
    }

}
