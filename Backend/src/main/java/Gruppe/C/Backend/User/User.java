package Gruppe.C.Backend.User;

import Gruppe.C.Backend.Chat.ChessClubChat;
import Gruppe.C.Backend.Chat.GroupChat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    @Length(min = 8)
    private String password;
    private LocalDate birthDate;
    private int points = 500;
    @Lob
    private byte[] profileImage; // byte[] als Blob in der Datenbank gespeichert
    private boolean privacy;
    private String token;
    private String superToken = "123456";

    //für Schachexperte Auszeichnung
    private int numberOfSolvedChessPuzzles = 0;

    @JsonIgnore
    @ManyToMany(mappedBy = "groupMembers")
    private Set<GroupChat> groupChats = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "membersOfChessClub")
    private Set<ChessClubChat> chessClubChats = new HashSet<>();

    //Konstruktor für Objekte aus Datenbank (mit ID)
    public User(Long id, String firstName, String lastName, String email, String password, LocalDate birthDate, int points, byte[] profileImage, boolean privacy) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.points = points;
        this.profileImage = profileImage;
        this.privacy = privacy;
    }

    //Konstruktor für Objekte, die noch nicht in der Datenbank sind (ohne ID, ohne Punkte (Standard 500))
    public User(String firstName, String lastName, String email, String password, LocalDate birthDate, byte[] profileImage, boolean privacy) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.profileImage = profileImage;
        this.privacy = privacy;
    }

    //Konstruktor für Objekte, die noch nicht in der Datenbank sind (ohne ID, ohne Punkte (Standard 500), ohne Profilbild)
    public User(String firstName, String lastName, String email, String password, LocalDate birthDate, boolean privacy) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.privacy = privacy;
    }

    public User() {

    }

    public User(String firstName, String lastName, String email, LocalDate birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;
    }


    //fuer 2FA
    public User(String firstName, String lastName, String email, String token, String superToken) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.token = token;
        this.superToken = superToken;
    }

    //fuer Friendship
    public User(Long id) {
        this.id = id;
    }

    public User(String firstName, String lastName, String email, LocalDate birthDate, byte[] profileImage) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;
        this.profileImage=profileImage;
    }

    //für Testklasse zum Leaderboard
    public User(String firstName, String lastName, String email, int points) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.points = points;
    }
    //Für Testklasse checkMate
    public User(String firstName, String lastName, String email, int points,Long id){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.points = points;
        this.id = id;
    }

    // Getter und Setter werden durch Lombok automatisch erstellt
}
