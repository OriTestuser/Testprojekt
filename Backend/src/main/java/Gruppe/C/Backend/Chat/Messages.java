package Gruppe.C.Backend.Chat;

import Gruppe.C.Backend.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Data
@Transactional
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long messageId;
    private String message;
    private LocalDateTime time;
    private boolean read;
    private Long senderId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "fk_chat_id")
    private Chat chat;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "fk_groupchat_id")
    private GroupChat groupChat;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "fk_chessclubchat_id")
    private ChessClubChat chessClubChat;
    public Messages() {
    }

    public Messages(Long messageId, String message, LocalDateTime time, boolean read, Long senderId) {
        this.messageId = messageId;
        this.message = message;
        this.time = time;
        this.read = read;
        this.senderId = senderId;
    }

    public Messages(String message, LocalDateTime time, boolean read, Long senderId) {
        this.message = message;
        this.time = time;
        this.read = read;
        this.senderId = senderId;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Messages other = (Messages) obj;
        return Objects.equals(messageId, other.messageId); // Annahme: Die ID identifiziert die Nachricht eindeutig
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageId); // Annahme: Die ID identifiziert die Nachricht eindeutig
    }

}
