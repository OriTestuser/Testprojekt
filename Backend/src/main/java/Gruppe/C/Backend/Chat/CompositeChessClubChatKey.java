package Gruppe.C.Backend.Chat;

import Gruppe.C.Backend.ChessClub.ChessClub;
import Gruppe.C.Backend.User.User;

import java.io.Serializable;

public class CompositeChessClubChatKey implements Serializable {

    private ChessClub chessClub;
    private User sender;
}
