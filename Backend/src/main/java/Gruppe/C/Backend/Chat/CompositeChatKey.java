package Gruppe.C.Backend.Chat;

import Gruppe.C.Backend.User.User;

import java.io.Serializable;

public class CompositeChatKey implements Serializable {

    private Long chatId;
    private User sender;
    private User receiver;
}
