package Gruppe.C.Backend.ChessGame;

import Gruppe.C.Backend.User.User;
import com.github.bhlangonijr.chesslib.Board;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@IdClass(CompositeChessGameKey.class)
public class ChessGame {
    @Id
    //im Fall des composite key den GenerationType AUTO nutzen
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chessGameId;
    //von user1 soll die Einladung versendet werden/worden sein
    @Id
    @JoinColumn(name = "userid1", referencedColumnName = "id")
    @ManyToOne
    private User user1;
    //von user2 soll die Einladung ggf. akzeptiert werden/worden sein
    @Id
    @JoinColumn(name = "userid2", referencedColumnName = "id")
    @ManyToOne
    private User user2;
    private String chessGameName;
    private Integer timer;//Allgemeine Zeit
    private Integer timerUser1;
    private Integer timerUser2;
    private boolean accepted; //zeigt, ob eine Einladung angenommen oder noch nicht beantwortet wurde
    private boolean started; //zeigt, ob eine angenommene Partie begonnen wurde
    private boolean finished; //zeigt, ob eine begonnene Partie beendet wurde
    private boolean insideGameUser1; //zeigt, ob der Inviter (Player 1) die Partie gerade spiele
    private boolean insideGameUser2; //zeigt, ob der Accepter (Player 2) die Partie aktuell spielt
    private boolean livestreamActive; //zeigt, ob Spiel live gestreamt wird
    @ManyToOne
    private User winner; //Welcher user gewonnen hat

    private int who=3; // who um zu wissen wer grade dran ist
    @ElementCollection
    private List<String> moveList; //Liste in welcher alle moves gespiechert werden (für PGN)

    private String boardState;// Zustand des Schachbretts wird als Text gespeichert

    //für die Spielhistorie
    private LocalDateTime timeStamp;
    //fürs PGN
    private LocalDateTime pgnTimeStamp;
    //fürs PGN
    private String termination;


    public ChessGame(Integer timer, String nameOfChessGame, Long userId1, Long userId2) {

    }

    //Konstruktor für Spieleinladungen
    //Hier Spiel noch nicht in der DB, erst nach dem Aufruf dieses Konstruktors
    public ChessGame(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
        //accepted und finished sind primitive Boolean-Typen und werden standardmäßig auf false gesetzt
    }

    //Konstruktor zum Festlegen der Spielsettings für bereits erstellte Spiele (chessGameName, timer)
    //nachdem Einladung angenommen wurde, accepted also true
    //Spiel bereits in der DB
    public ChessGame(Long chessGameId, String chessGameName, Integer timer, User user1, User user2, boolean accepted) {
        this.chessGameId = chessGameId;
        this.chessGameName = chessGameName;
        this.user1 = user1;
        this.user2 = user2;
        this.timer = timer;
        this.accepted = accepted;
    }

    //Konstruktor zum Zurückkehren zu einem begonnenen Spiel
    //Spiel bereits in der DB
    public ChessGame(Long chessGameId, User user1, User user2, String chessGameName, Integer timerUser1, Integer timerUser2,  boolean accepted, boolean started, boolean finished) {
        this.chessGameId = chessGameId;
        this.user1 = user1;
        this.user2 = user2;
        this.chessGameName = chessGameName;
        this.timerUser1 = timerUser1;
        this.timerUser2 = timerUser2;
        this.accepted = accepted;
        this.started = started;
        this.finished = finished;
    }
    //Für den Test
    public ChessGame(Long chessGameId, User user1, User user2, String chessGameName, Integer timerUser1, Integer timerUser2,  boolean accepted, boolean started, boolean finished, String boardState) {
        this.chessGameId = chessGameId;
        this.user1 = user1;
        this.user2 = user2;
        this.chessGameName = chessGameName;
        this.timerUser1 = timerUser1;
        this.timerUser2 = timerUser2;
        this.accepted = accepted;
        this.started = started;
        this.finished = finished;
        this.boardState = boardState;
    }




    public ChessGame(Integer timer, String nameOfChessGame, User user1, User user2) {
        this.timer = timer;
        this.chessGameName = chessGameName;
        this.user1 = user1;
        this.user2 = user2;
    }

    public ChessGame() {

    }

}
