package Gruppe.C.Backend.Chat;

import Gruppe.C.Backend.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Transactional
//@IdClass(CompositeChatKey.class)
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "chat_id")
    private Long chatId;

    @JoinColumn(name = "sender", referencedColumnName = "id")
    @ManyToOne
    private User sender;

    @JoinColumn(name = "receiver", referencedColumnName = "id")
    @ManyToOne
    private User receiver;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_chat_id",referencedColumnName = "chat_id")
    //@JoinColumn(name = "messageId")
    private List<Messages> messages = new ArrayList<>();

    public Chat() {
    }

    public Chat(Long chatId, User sender, User receiver, List<Messages> messages) {
        this.chatId = chatId;
        this.sender = sender;
        this.receiver = receiver;
        this.messages = messages;
    }

    public Chat(User sender, User receiver, List<Messages> messages) {
        this.sender = sender;
        this.receiver = receiver;
        this.messages = messages;
    }

}
