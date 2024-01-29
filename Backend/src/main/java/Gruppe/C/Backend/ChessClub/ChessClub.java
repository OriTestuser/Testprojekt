package Gruppe.C.Backend.ChessClub;

import Gruppe.C.Backend.Chat.ChessClubChat;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ChessClub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String chessClubName;

    @OneToOne(mappedBy = "chessClub", cascade = CascadeType.ALL)
    private ChessClubChat chessClubChat;


    // Konstruktor zum Erstellen eines neuen Schachclubs
    // Konstruktor für Objekte, die noch nicht in der Datenbank sind (ohne ID, ohne Member)
    public ChessClub(String chessClubName) {
        this.chessClubName = chessClubName;
    }

    //Konstruktor für Objekte aus Datenbank (mit ID & Member)
    public ChessClub(Long id, String chessClubName) {
        this.id = id;
        this.chessClubName = chessClubName;
    }

    public ChessClub() {

    }

    //Getter und Setter erstellt durch @Data
}