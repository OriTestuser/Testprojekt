package Gruppe.C.Backend.ChessGame;

import Gruppe.C.Backend.User.User;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.io.Serializable;

/*
    Idee zum Erstellen eines Composite Key
    Quelle: https://stackoverflow.com/questions/41143913/sql-jpa-multiple-columns-as-primary-key
    edited Dec 25, 2022 at 22:19 by starball
    answered Dec 14, 2016 at 13:41 by Raul Cuth
 */
public class CompositeChessGameKey implements Serializable {
    private Long chessGameId;
    private User user1;
    private User user2;
}