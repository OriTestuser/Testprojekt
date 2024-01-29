package Gruppe.C.Backend.ChessGame;

import Gruppe.C.Backend.User.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ChessMove {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "chessGameId", referencedColumnName = "chessGameId"),
            @JoinColumn(name = "userid1", referencedColumnName = "userid1"),
            @JoinColumn(name = "userid2", referencedColumnName = "userid2")
    })
    private ChessGame chessGame;

    private String move;

    private int moveCounter;
}
