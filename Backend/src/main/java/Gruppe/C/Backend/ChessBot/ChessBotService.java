package Gruppe.C.Backend.ChessBot;

import Gruppe.C.Backend.ChessGame.PGNDTO;
import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import com.github.bhlangonijr.chesslib.move.Move;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.github.bhlangonijr.chesslib.Board;
import com.rahul.stockfish.Stockfish;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@Transactional
public class ChessBotService {

    private final UserRepository userRepository;
    private final ChessBotRepository chessBotRepository;

    public ChessBotService(UserRepository userRepository, ChessBotRepository chessBotRepository) {
        this.userRepository = userRepository;
        this.chessBotRepository = chessBotRepository;
    }


    private final List <String> stringMoveList = new ArrayList<>();

    public ResponseEntity<Long> createGameWithBot(Long userId, String gameName, byte gameLevel, Integer timer) {

        if (userRepository.findById(userId).isPresent()) {

            if (gameName != null) {

                if (timer != null && timer > 0) {

                    if ((gameLevel == 1 || gameLevel == 2 || gameLevel == 3)) {

                        ChessBot gameWithBot = new ChessBot();
                        gameWithBot.setPlayer(userRepository.getUserById(userId));
                        gameWithBot.setChessGameName(gameName);
                        gameWithBot.setLevel(gameLevel);
                        gameWithBot.setTimerUser(timer);
                        gameWithBot.setBoardState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
                        gameWithBot.setTurn(true);
                        gameWithBot.setPlayerInGame(true);
                        gameWithBot.setStartOfGame(LocalDateTime.now());
                        gameWithBot.setStreaming(false);

                        chessBotRepository.save(gameWithBot);

                        System.out.println("ChessBot created");
                        return ResponseEntity.status(HttpStatus.OK).body(gameWithBot.getChessBotId());
                    }

                    System.out.println("Invalid difficulty level");
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
                }

                System.out.println("No timer");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }

            System.out.println("Name of the Game should not be null");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        System.out.println("User not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }


    public ResponseEntity<Boolean> updateTimer(Integer timer, Long chessBotId) {
        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        if(chessBot != null)  {
            if(timer != 0) {
                chessBot.setTimerUser(timer);
                chessBotRepository.save(chessBot);
                return ResponseEntity.status(HttpStatus.OK).body(true);
            }
            else {
                endGame(chessBotId);
                System.out.println("Timer abgelaufen");
                return ResponseEntity.status(HttpStatus.OK).body(true);
            }

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
    }


    public ResponseEntity<Boolean> endIfTimerExpired(Long chessBotId) {
        ChessBot chessBot =  chessBotRepository.findByChessBotId(chessBotId);
        if(chessBot != null) {
            chessBot.setWinner("Bot");
            chessBotRepository.save(chessBot);
            endGame(chessBotId);
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        else {
            return ResponseEntity.status((HttpStatus.NOT_FOUND)).body(false);
        }
    }
    // Timer nur für den User

    /* public void startTimer(Long chessBotId) {
        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        if(chessBot != null && !chessBot.isFinished()) {
            Timer timer = new Timer(String.valueOf(chessBot.getTimerUser()));
            timer.scheduleAtFixedRate(new TimerTask() {
                @Override
                public void run() {

                    LocalDateTime currentTime = LocalDateTime.now();
                    long elapsedSeconds = ChronoUnit.SECONDS.between(chessBot.getStartTimer(), currentTime);
                    //chessBot.setTimerUser(chessBot.getTimerUser() - 5);
                    //System.out.println(chessBot.getTimerUser());
                    //chessBotRepository.save(chessBot);

                    if(elapsedSeconds >= chessBot.getTimerUser()) {
                        timer.cancel();
                        chessBot.setWinner("Bot");
                        chessBotRepository.save(chessBot);
                        endGame(chessBotId);
                    }
                }
            } , 10, 1000);

        }

    }





    public void pauseTimer(Long chessBotId) {
        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        if(chessBot != null && !chessBot.isFinished()) {
            long timeLeft = ChronoUnit.SECONDS.between(chessBot.getStartTimer(), LocalDateTime.now());
            Integer time = (int) timeLeft;
            chessBot.setTimerUser(time);
            chessBotRepository.save(chessBot);
            Timer timer = new Timer(String.valueOf(chessBot.getTimerUser()));
            timer.cancel();
        }
    }

     */




    public ResponseEntity<Boolean> makeMove(Long chessBotId, String moveUser) {

        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);

        if (chessBot != null && !chessBot.isFinished()) {

            if(chessBot.isTurn()) {

                Board board = new Board();

                if (!chessBot.isStarted()) {
                    chessBot.setStarted(true);
                }

                board.loadFromFen(chessBot.getBoardState());
                List<Move> legalMoves = board.legalMoves();
                Move move;

                for (Move legalMove : legalMoves) {

                    if (legalMove.toString().equals(moveUser)) {

                        move = legalMove;
                        board.doMove(move);

                        chessBot.setBoardState(board.getFen());

                        if (board.isMated()) {
                            chessBot.setWinner("User");
                            chessBotRepository.save(chessBot);
                            endGame(chessBotId);
                            System.out.println("Schachmatt");
                            return ResponseEntity.status(HttpStatus.OK).body(true);
                        }

                        else if (board.isDraw()) {
                            chessBot.setWinner("Draw");
                            chessBotRepository.save(chessBot);
                            endGame(chessBotId);
                            System.out.println("Remis");
                            return ResponseEntity.status(HttpStatus.OK).body(true);
                        }

                        else {
                            chessBot.setTurn(false);
                        }

                        chessBotRepository.save(chessBot);
                        //pauseTimer(chessBotId);

                        System.out.println("turn: " + chessBot.isTurn());
                        System.out.println("board: " + chessBot.getBoardState());
                        return ResponseEntity.status(HttpStatus.OK).body(true);

                    }

                }
                System.out.println("No legal move!");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(false);

            }

            System.out.println("Not User turn");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(false);

        }

        System.out.println("ChessGame not found, already finished or not Users turn");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);

    }


    public void endGame(Long chessBotId) {

        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        chessBot.setFinished(true);
        chessBot.setTimeStamp(LocalDateTime.now());

        if (chessBot.getWinner().equals("User")) {
            User winner = chessBot.getPlayer();
            winner.setPoints(winner.getPoints() + 10);
            userRepository.save(winner);
        } else {
            User loser = chessBot.getPlayer();
            loser.setPoints(loser.getPoints() - 10);
            userRepository.save(loser);
        }

        chessBotRepository.save(chessBot);
    }


    public ResponseEntity<MoveDTO> getBestMoveGameWithBot(Long chessBotId, Long userId) {
        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        User player = userRepository.getUserById(userId);

        if (chessBot != null && player != null) {

            MoveDTO bestMove = new MoveDTO();
            Stockfish stockfish = new Stockfish();
            stockfish.startEngine();
            String move = stockfish.getBestMove(chessBot.getBoardState(), 2000);
            bestMove.setBestMove(move);
            stockfish.stopEngine();

            if (player.getPoints() > 0) {
                player.setPoints(player.getPoints() - 1);
                userRepository.save(player);
            }

            bestMove.setPoints(player.getPoints());

            return ResponseEntity.status(HttpStatus.OK).body(bestMove);

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }


    public ResponseEntity<MoveDTO> botMove(Long chessBotId) {

        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        byte level = chessBot.getLevel();

        switch (level) {
            case (1):
                //move für einfach
                return moveFromBot(chessBotId, "3");

            case (2):
                //move für mittel
                return moveFromBot(chessBotId, "6");

            case (3):
                //move für schwer
                return moveFromBot(chessBotId, "10");

            default:
                System.out.println("sollte nicht passieren");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }


    public ResponseEntity<MoveDTO> moveFromBot(Long chessBotId, String depth) {

        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);

        if (chessBot != null && chessBot.isPlayerInGame()) {

            Board board = new Board();

            if(!chessBot.isTurn()) {

                Stockfish stockfish = new Stockfish();

                stockfish.startEngine();
                board.loadFromFen(chessBot.getBoardState());

                String move = stockfish.getBestMoveWithDepth(chessBot.getBoardState(), 2000, depth);

                stockfish.stopEngine();
                board.doMove(move);

                chessBot.setBoardState(board.getFen());

                MoveDTO botMove = new MoveDTO(move, chessBot.getBoardState());


                if (board.isMated()) {
                    chessBot.setWinner("Bot");
                    chessBotRepository.save(chessBot);
                    endGame(chessBotId);
                    System.out.println("Schachmatt");
                    return ResponseEntity.status(HttpStatus.OK).body(botMove);
                }

                else if (board.isDraw()) {
                    endGame(chessBotId);
                    System.out.println("Remis");
                    return ResponseEntity.status(HttpStatus.OK).body(botMove);
                }

                else {
                    chessBot.setTurn(true);

                }

                chessBotRepository.save(chessBot);
                //startTimer(chessBotId);

                System.out.println("turn: " + chessBot.isTurn());
                System.out.println("board: " + chessBot.getBoardState());
                return ResponseEntity.status(HttpStatus.OK).body(botMove);
            }

            System.out.println("turn: " + chessBot.isTurn());
            System.out.println("Bot ist nicht dran");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    public ResponseEntity<List<ChessBot>> chessBotGames(Long userId) {
        User user = userRepository.getUserById(userId);
        if (user != null) {
            List<ChessBot> chessBotGames = chessBotRepository.findChessBotByPlayerAndFinishedFalse(user);
            return ResponseEntity.status(HttpStatus.OK).body(chessBotGames);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }


    public ResponseEntity<List<String>> legalMoves(Long chessBotId) {
        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        if (chessBot != null) {
            Board board = new Board();
            board.loadFromFen(chessBot.getBoardState());
            List<com.github.bhlangonijr.chesslib.move.Move> legal = board.legalMoves();
            List<String> legalMoves = new ArrayList<>();
            for (com.github.bhlangonijr.chesslib.move.Move move : legal) {
                legalMoves.add(move.toString());
            }

            return ResponseEntity.status(HttpStatus.OK).body(legalMoves);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    public ResponseEntity<Boolean> leaveGame(Long chessBotId) {
        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        if (chessBot != null) {
            chessBot.setPlayerInGame(false);
            //pauseTimer(chessBotId);
            chessBotRepository.save(chessBot);
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        return ResponseEntity.status(HttpStatus.OK).body(false);
    }


    public ResponseEntity<Boolean> rejoinGame(Long chessBotId) {
        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        if (chessBot != null) {
            chessBot.setPlayerInGame(true);
            //startTimer(chessBotId);
            chessBotRepository.save(chessBot);
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        return ResponseEntity.status(HttpStatus.OK).body(false);
    }

    public ResponseEntity<Boolean> surrender(Long chessBotId) {
        ChessBot chessBot = chessBotRepository.findByChessBotId(chessBotId);
        if(chessBot != null) {
            chessBot.setFinished(true);
            chessBot.setTimeStamp(LocalDateTime.now());


            chessBotRepository.save(chessBot);

            User user = userRepository.getUserById(chessBot.getPlayer().getId());
            if(user.getPoints() > 10) {
                user.setPoints(user.getPoints() - 10);
            }
            else {
                user.setPoints(0);
            }
            userRepository.save(user);
            chessBot.setWinner("Bot");

            return ResponseEntity.status(HttpStatus.OK).body(true);
        }

        return ResponseEntity.status(HttpStatus.OK).body(false);

    }

    //String builder für PGN
     public String convertToPgnFormat1(ChessBot game) {
        StringBuilder pgnBuilder = new StringBuilder();


        // Fügen Sie die Metadaten hinzu
        pgnBuilder.append("[Event \"").append("Schachspiel").append("\"]\n");
        pgnBuilder.append("[Site \"").append("SchachEp").append("\"]\n");
        pgnBuilder.append("[Date \"").append(game.getStartOfGame()).append("\"]\n");
        pgnBuilder.append("[Round \"").append("1.1").append("\"]\n");
        pgnBuilder.append("[White \"").append(game.getPlayer().getFirstName()).append(game.getPlayer().getLastName()).append("\"]\n");
        pgnBuilder.append("[Black \"").append("Bot").append("\"]\n");
        pgnBuilder.append("[Result \"").append("1-0").append("\"]\n");
        pgnBuilder.append("[WhiteElo \"").append(game.getPlayer().getPoints()).append("\"]\n");
        pgnBuilder.append("[BlackElo \"").append("Bot has no Points").append("\"]\n");
        pgnBuilder.append("[Variant \"").append("Standard").append("\"]\n");
        pgnBuilder.append("[TimeControl \"").append("-").append("\"]\n");
        pgnBuilder.append("[Eco \"").append("B91").append("\"]\n");
        pgnBuilder.append("[Opening \"").append("Domenikansiche Defense").append("\"]\n");
        pgnBuilder.append("[Termination \"").append("Unknown").append("\"]\n\n");


        // Liste im PGN Format

        pgnBuilder.append(generatePGN(game.getMoveList()));



        return pgnBuilder.toString();
    }
    //Für den richtigen abstand und das zusammenfügen der PGN Notation

    public String generatePGN(List<String> moves){
        StringBuilder pgnBuilder = new StringBuilder();
        for(int i=0;i< moves.size();i++){
            if(i%2==0){
                pgnBuilder.append((i/2+1)).append(". ");
            }
            pgnBuilder.append(moves.get(i)).append(" ");
        }
        return pgnBuilder.toString();
    }
    //DTO Damit ein string übergeben werden kann
    public PGNDTO convertToPgnFormat(Long gameId){
        ChessBot game = chessBotRepository.findByChessBotId(gameId);
        PGNDTO pgndto = new PGNDTO();
        pgndto.setPGN(convertToPgnFormat1(game));
        return pgndto;
    }

    //Sen notation aus dem frontend
    public Boolean senNotation(Long chessBotId, String sen) {
        ChessBot game = chessBotRepository.findByChessBotId(chessBotId);
        stringMoveList.add(sen);
        game.setMoveList(stringMoveList);
        chessBotRepository.save(game);
        return true;

    }


}