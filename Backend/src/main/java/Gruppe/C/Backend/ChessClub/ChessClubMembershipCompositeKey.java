package Gruppe.C.Backend.ChessClub;

import Gruppe.C.Backend.User.User;
import java.io.Serializable;

/*
Idee zum Erstellen eines Composite Key
Quelle: https://stackoverflow.com/questions/41143913/sql-jpa-multiple-columns-as-primary-key
edited Dec 25, 2022 at 22:19 by starball
answered Dec 14, 2016 at 13:41 by Raul Cuth
*/
public class ChessClubMembershipCompositeKey implements Serializable {
    private ChessClub membershipChessclub;
    private User membershipUser;
}