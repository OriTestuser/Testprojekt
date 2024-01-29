package Gruppe.C.Backend.Chat;
import Gruppe.C.Backend.ChessClub.ChessClub;
import Gruppe.C.Backend.User.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class ChessClubChat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chessclubchat_id")
    private Long chessClubChatId;


    @OneToOne
    @JoinColumn(name = "chess_club_id", referencedColumnName = "id")
    private ChessClub chessClub;


    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User sender;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "chessclubchat_members",
            joinColumns = @JoinColumn(name = "chessclubchat_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> membersOfChessClub = new HashSet<>();


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_chessclubchat_id",referencedColumnName = "chessclubchat_id")
    //@JoinColumn(name = "messageId")
    private List<Messages> messages = new ArrayList<>();

    private String chatName;

    public ChessClubChat() {
    }

    public ChessClubChat(ChessClub chessClub, User sender, Set<User> membersOfChessClub, List<Messages> messages, String chatName) {
        this.chessClub = chessClub;
        this.sender = sender;
        this.membersOfChessClub = membersOfChessClub;
        this.messages = messages;
        this.chatName = chatName;
    }
}
