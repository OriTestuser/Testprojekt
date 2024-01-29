package Gruppe.C.Backend.ChessPuzzle;

import Gruppe.C.Backend.User.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.validator.constraints.Length;


@Data
@Entity
@IdClass(CompositeChessPuzzleKey.class)
public class ChessPuzzle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long puzzleId;

    @Id
    @JoinColumn(name = "player", referencedColumnName = "id")
    @ManyToOne
    private User player;

    private String chessPuzzleId; //Id aus der csv file
    //Chess move bestehend aus 4 Zeichen, es soll der zweite move als bestMove gefunden werden
    @Length(min = 9)
    private String moves;

    //für FEN des Ausgangsstatus
    private String chessPuzzleStatusFEN;
    //für Status eines Schachpuzzlesmoves
    private boolean solved;


    public ChessPuzzle() {
    }

    public ChessPuzzle(Long puzzleId) {
        this.puzzleId = puzzleId;
    }

    public Long getPuzzleId() {
        return puzzleId;
    }

    public void setPuzzleId(Long puzzleId) {
        this.puzzleId = puzzleId;
    }

    //besten Move aus moves auslesen
    public String getbestMove (String moves) {
        return moves.substring(5, 9);
    }


    //Getter und Setter erstellt durch @Data
}
