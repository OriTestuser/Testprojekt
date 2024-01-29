package Gruppe.C.Backend.ChessGame;



import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.move.Move;
import com.rahul.stockfish.Stockfish;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.*;


@Service


public class PlayChessGameService {
    private final ChessGameRepository chessGameRepository;
    private final UserRepository userRepository;

    private final ChessMoveRepository chessMoveRepository;
    private Timer timerUserw;
    private Timer timerUserb;

    private final List <String> stringMoveList = new ArrayList<>();

    //wenn who Ungrade ist, ist es weiß. Wenn grade schwarz

    //für Assistentenbot

    private final Stockfish stockfish;


    public PlayChessGameService(ChessGameRepository chessGameRepository, UserRepository userRepository, ChessMoveRepository chessMoveRepository){
        this.chessGameRepository = chessGameRepository;

        this.userRepository = userRepository;
        this.chessMoveRepository = chessMoveRepository;

        this.stockfish = new Stockfish();
        System.out.println("Konstruktor mit Stockfish Instanz hat geklappt");
    }




    public Boolean makeMove(String moveString,Long chessGameId) {
        ChessGame chessGame = chessGameRepository.findChessGameByChessGameId(chessGameId);
        Board board = new Board();



        if (chessGame != null) {



            board.loadFromFen(chessGame.getBoardState());
            List<Move> legalMoves = board.legalMoves();
            System.out.println("Legal moves: " + legalMoves);
            Move move = null;

            for (Move legalMove : legalMoves) {
                if (legalMove.toString().equals(moveString)) {
                    move = legalMove;




                    break;
                }
            }

                if (move != null) {
                    //Schach move ausführen

                    board.doMove(move);
                    chessGame.setBoardState(board.getFen());
                    startTimers(chessGame);
                    chessGame.setWho(chessGame.getWho() + 1);


                    //ChessMoves speichern nicht mehr benötigt
                    ChessMove chessMove= new ChessMove();
                    chessMove.setChessGame(chessGame);
                    chessMove.setMove(moveString);
                    chessMoveRepository.save(chessMove);


                    chessGameRepository.save(chessGame);
                    



                    //boardstate
                    return true;

                    //return "succesful";
                } else {
                    //"Illegal move!"
                    return false;
                }

            }
        //"Chess game not found"
            return false;
        }


    private void startTimers(ChessGame chessGame) {
        if (chessGame.getWho() % 2 == 0) {
            if (timerUserb != null) {
                timerUserb.cancel(); // Vorherigen Timer abbrechen, wenn vorhanden
            }
        }

        if (chessGame.getWho() % 2 == 0&& !chessGame.isFinished()) {
            timerUserw = new Timer(String.valueOf(chessGame.getTimerUser1()));
            timerUserw.scheduleAtFixedRate(new TimerTask() {
                @Override
                public void run() {

                    chessGame.setTimerUser1(chessGame.getTimerUser1() - 5);
                    System.out.println(chessGame.getTimerUser1());
                    chessGameRepository.save(chessGame);


                    if (chessGame.getTimerUser1() <= 0) {
                        System.out.println("Spieler 1 hat die Zeit überschritten. Spiel beendet.");
                        timerUserw.cancel();
                        endGame(chessGame,chessGame.getUser1(),chessGame.getUser2());
                    }
                }
            }, 0, 5000); // Timer läuft jede Sekunde


        } else {
            if (!chessGame.isFinished()){
                if (timerUserw != null) {
                    timerUserw.cancel(); // Vorherigen Timer abbrechen, wenn vorhanden
                }
                timerUserb = new Timer(String.valueOf(chessGame.getTimerUser2()));

                timerUserb.scheduleAtFixedRate(new TimerTask() {
                    @Override
                    public void run() {
                        chessGame.setTimerUser2(chessGame.getTimerUser2() - 5);
                        System.out.println(chessGame.getTimerUser2());
                        chessGameRepository.save(chessGame);


                        if (chessGame.getTimerUser2() <= 0) {
                            System.out.println("Spieler 2 hat die Zeit überschritten. Spiel beendet.");
                            timerUserb.cancel();
                            endGame(chessGame, chessGame.getUser2(), chessGame.getUser1());
                        }
                    }
                }, 0, 5000); // Timer läuft jede Sekunde


            }
        }

    }

    private void endGame(ChessGame chessGame, User userWinner, User userLoser) {
        chessGame.setFinished(true);
        chessGame.setTimeStamp(LocalDateTime.now());

        if(userLoser.getPoints()-10>0) {
            userLoser.setPoints(userLoser.getPoints() - 10);
        } else {
            userLoser.setPoints(0);
        }

        userWinner.setPoints(userWinner.getPoints()+10);
        chessGame.setWinner(userWinner);

        userRepository.save(userLoser);
        userRepository.save(userWinner);
        chessGameRepository.save(chessGame);
    }


    public List<String> legalMoves(Long chessGameId) {
        List<String> legalMove = new ArrayList<>();
        ChessGame chessGame = chessGameRepository.findChessGameByChessGameId(chessGameId);
        Board board = new Board();
        board.loadFromFen(chessGame.getBoardState());
        legalMove.add(board.legalMoves().toString());
        return legalMove;

    }

    public Boolean checkMate(Long chessGameId, Long winnerId, Long loserId) {
        ChessGame chessGame = chessGameRepository.findChessGameByChessGameId(chessGameId);
        chessGame.setFinished(true);
        chessGame.setTimeStamp(LocalDateTime.now());
        chessGame.setTermination("CheckMate");


        chessGameRepository.save(chessGame);

        User wuser = userRepository.getUserById(winnerId);
        wuser.setPoints(wuser.getPoints()+10);
        userRepository.save(wuser);
        chessGame.setWinner(wuser);

        User luser = userRepository.getUserById(loserId);

        if(luser.getPoints()-10>0) {
            luser.setPoints(luser.getPoints() - 10);
        } else {
            luser.setPoints(0);
        }
        userRepository.save(luser);





        return true;
    }

    public Boolean draw(Long chessGameId) {
        ChessGame chessGame = chessGameRepository.findChessGameByChessGameId(chessGameId);
        Board board = new Board();
        board.loadFromFen(chessGame.getBoardState());
        if(board.isDraw()){
            chessGame.setFinished(true);
            //chessGame.winner bleibt null
            chessGame.setTermination("Draw");
            chessGameRepository.save(chessGame);
            return true;
        }
        else {
            return false;
        }
    }

    public List<String> fen(Long chessGameId) {
        ChessGame chessGame =chessGameRepository.findChessGameByChessGameId(chessGameId);
        String fen= chessGame.getBoardState();
        List<String> fenList = new ArrayList<>();
        fenList.add(fen);
        System.out.println(fenList);


        return fenList;   }

    public Integer timer(Long chessGameId, String whitheOrBlack) {
        ChessGame chessGame =chessGameRepository.findChessGameByChessGameId(chessGameId);
        if(whitheOrBlack.equals("w")){
            return chessGame.getTimerUser1();
        }
        if(whitheOrBlack.equals("b")){
            return chessGame.getTimerUser2();
        }
        // 0 wenn, falsche buchstabe übergeben
        return 0;

    }

    public Boolean getFinished(Long chessGameId) {
        ChessGame chessGame =chessGameRepository.findChessGameByChessGameId(chessGameId);
        return chessGame.isFinished();
    }

    public Boolean surrender(Long chessGameId, Long winnerId, Long loserId) {
        ChessGame chessGame =chessGameRepository.findChessGameByChessGameId(chessGameId);
        chessGame.setFinished(true);
        chessGame.setTimeStamp(LocalDateTime.now());
        chessGame.setTermination("Surrender");


        chessGameRepository.save(chessGame);

        User wuser = userRepository.getUserById(winnerId);
        wuser.setPoints(wuser.getPoints()+10);
        userRepository.save(wuser);
        chessGame.setWinner(wuser);

        User luser = userRepository.getUserById(loserId);
        if(luser.getPoints()-10>0) {
            luser.setPoints(luser.getPoints() - 10);
        } else {
            luser.setPoints(0);
        }
        userRepository.save(luser);

        return true;

    }


    //Assistentenbot
    public ResponseEntity<BestMoveDTO> getBestMove(Long chessGameId, Long userId) {
        Optional<ChessGame> chessGameFound = chessGameRepository.findGameByChessGameId(chessGameId);
        Optional<User> userFound = userRepository.findById(userId);
        if (chessGameFound.isPresent() && userFound.isPresent()) {
            String boardStatusFEN = chessGameFound.get().getBoardState();
            //besten move bestimmen
            stockfish.startEngine();
            System.out.println("Stockfish Engine Starten hat geklappt");
            String bestMove = stockfish.getBestMove(boardStatusFEN, 2000);
            System.out.println("Stockfish getBestMove Methode aufrufen hat geklappt");
            stockfish.stopEngine();

            //Punktzahl im User anpassen
            if(userFound.get().getPoints()>0) {
                userFound.get().setPoints(userFound.get().getPoints() - 1);
                userRepository.save(userFound.get());
            }

            //DTO Objekt erzeugen
            BestMoveDTO bestMoveDTO = new BestMoveDTO(bestMove, userFound.get().getPoints());

            return ResponseEntity.status(HttpStatus.OK).body(bestMoveDTO);
        }
        // ChessGame oder User nicht gefunden
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    //String builder für PGN
    public String convertToPgnFormat1(ChessGame game) {
        StringBuilder pgnBuilder = new StringBuilder();





        // Fügen Sie die Metadaten hinzu
        pgnBuilder.append("[Event \"").append("Schachspiel").append("\"]\n");
        pgnBuilder.append("[Site \"").append("SchachEp").append("\"]\n");
        pgnBuilder.append("[Date \"").append(game.getPgnTimeStamp()).append("\"]\n");
        pgnBuilder.append("[Round \"").append("1.1").append("\"]\n");
        pgnBuilder.append("[White \"").append(game.getUser1().getFirstName()).append(game.getUser1().getLastName()).append("\"]\n");
        pgnBuilder.append("[Black \"").append(game.getUser2().getFirstName()).append(game.getUser2().getLastName()).append("\"]\n");
        pgnBuilder.append("[Result \"").append("1-0").append("\"]\n");
        pgnBuilder.append("[WhiteElo \"").append(game.getUser1().getPoints()).append("\"]\n");
        pgnBuilder.append("[BlackElo \"").append(game.getUser2().getPoints()).append("\"]\n");
        pgnBuilder.append("[Variant \"").append("Standard").append("\"]\n");
        pgnBuilder.append("[TimeControl \"").append("-").append("\"]\n");
        pgnBuilder.append("[Eco \"").append("B91").append("\"]\n");
        pgnBuilder.append("[Opening \"").append("Domenikansiche Defense").append("\"]\n");
        pgnBuilder.append("[Termination \"").append(termination(game)).append("\"]\n\n");


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
    public PGNDTO  convertToPgnFormat(Long gameId){
        ChessGame chessGame =chessGameRepository.findChessGameByChessGameId(gameId);
        PGNDTO pgndto = new PGNDTO();
        pgndto.setPGN(convertToPgnFormat1(chessGame));
        return pgndto;
    }

    //Sen notation aus dem frontend
    public Boolean senNotation(Long chessGameId, String sen) {
        ChessGame chessGame =chessGameRepository.findChessGameByChessGameId(chessGameId);
        stringMoveList.add(sen);
        chessGame.setMoveList(stringMoveList);
        chessGameRepository.save(chessGame);
        return true;

    }
    //Winner 1-0 oder 0-1
    /*public String winner (ChessGame chessGame){
        if(chessGame.getWinner().equals(chessGame.getUser1())){
            return "1-0";
        }
        if(chessGame.getWinner().equals((chessGame.getUser2()))){
            return "0-1";
        }
        else{
            return "0-0";
        }

    }*/
    public String termination (ChessGame chessGame){
        if(chessGame.getTermination()==null){
            return "Unknown";

        }
        if(chessGame.getTermination().equals("Surrender")){
            return "Surrender";
        }
        if(chessGame.getTermination().equals("Draw")){
            return "Draw";
        }
        if (chessGame.getTermination().equals("CheckMate")){
            return "CheckMate";
        }
        else{
            return "Unknown";
        }
    }
}
