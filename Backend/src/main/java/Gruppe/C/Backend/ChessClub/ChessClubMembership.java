package Gruppe.C.Backend.ChessClub;

import Gruppe.C.Backend.User.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@IdClass(ChessClubMembershipCompositeKey.class)
public class ChessClubMembership {
    //ManyToOne Beziehung, da mehrere ChessClub Mitgliedschaften für denselben ChessClub existieren können
    @Id
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private ChessClub membershipChessclub;

    //ManyToOne Beziehung, da mehrere ChessClub Mitgliedschaften für den selben User existieren können
    @Id
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    //referencedColumnName gibt den Name der referenzierten primary key Spalte in der Entity ChessClub an
    private User membershipUser;

    // Konstruktor für die Verwendung in der Anwendung
    public ChessClubMembership(User membershipUser, ChessClub membershipChessclub) {
        this.membershipUser = membershipUser;
        this.membershipChessclub = membershipChessclub;
    }

    public ChessClubMembership() {

    }
}
