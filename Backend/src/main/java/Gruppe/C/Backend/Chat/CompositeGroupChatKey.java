package Gruppe.C.Backend.Chat;
import Gruppe.C.Backend.User.User;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;


public class CompositeGroupChatKey implements Serializable {
    private Long groupChatId;
    private User sender;

}
