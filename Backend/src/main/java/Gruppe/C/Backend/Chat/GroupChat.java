package Gruppe.C.Backend.Chat;

import Gruppe.C.Backend.User.User;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Transactional
//@IdClass(CompositeGroupChatKey.class)
public class GroupChat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "groupchat_id")
    private Long groupChatId;

    @JoinColumn(name = "sender", referencedColumnName = "id")
    @ManyToOne
    private User sender;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "group_members",
            joinColumns = @JoinColumn(name = "groupchat_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> groupMembers = new HashSet<>();

    /*@ManyToMany(mappedBy = "groupChat")
    private List<User> members = new ArrayList<>();

     */

    private String groupName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_groupchat_id",referencedColumnName = "groupchat_id")
    //@JoinColumn(name = "messageId")
    private List<Messages> messages = new ArrayList<>();

    public GroupChat() {
    }

    public GroupChat(Set<User> members, String groupName, List<Messages> messages) {
        this.groupMembers = members;
        this.groupName = groupName;
        this.messages = messages;
    }



}
