package Gruppe.C.Backend.ChessBot;

import Gruppe.C.Backend.User.User;
import com.github.bhlangonijr.chesslib.move.Move;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@Data
@Entity
public class ChessBot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chessBotId;

    @JoinColumn(name = "userid", referencedColumnName = "id")
    @ManyToOne
    private User player;

    private String chessGameName;

    private Integer timerUser;

    private boolean started;

    private boolean finished;

    private boolean playerInGame;

    private String boardState;

    private byte level; // 1, 2 oder 3

    private boolean turn;  // true -> User, false -> Bot

    private String winner; // Soll nur "Bot", "User" oder "Draw" sein

    private LocalDateTime timeStamp;

    private LocalDateTime startOfGame;

   // private LocalDateTime startTimer;

    @ElementCollection
    private List<String> moveList;

    private boolean streaming;


}
