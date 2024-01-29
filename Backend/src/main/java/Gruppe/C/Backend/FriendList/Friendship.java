package Gruppe.C.Backend.FriendList;

import Gruppe.C.Backend.User.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@IdClass(CompositeFriendshipKey.class)
public class Friendship {
    //von user1 soll die Anfrage versendet werden/worden sein
    @Id
    @JoinColumn(name = "userid1", referencedColumnName = "id")
    @ManyToOne
    private User user1;
    //von user2 soll die Anfrage ggf. akzeptiert werden/worden sein
    @JoinColumn(name = "userid2", referencedColumnName = "id")
    @Id
    @ManyToOne
    private User user2;
    private boolean accepted; // Zeigt an, ob die Freundschaft akzeptiert wurde

    //falls Anfrage noch ausstehend ist oder akzeptiert wurde; bereits in der DB gespeichert:
    public Friendship(User user1, User user2, boolean accepted) {
        this.user1 = user1;
        this.user2 = user2;
        this.accepted = accepted;
    }

    //Anfrage wird gerade angelegt
    public Friendship(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public Friendship() {

    }

    // Getter und Setter bereits erstellt durch @Data
}