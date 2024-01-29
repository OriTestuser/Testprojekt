package Gruppe.C.Backend.ChessClub;

import Gruppe.C.Backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChessClubMembershipRepository extends JpaRepository<ChessClubMembership, ChessClubMembershipCompositeKey> {

    List<ChessClubMembership> findByMembershipChessclub(ChessClub chessClub);
    List<ChessClubMembership> findByMembershipUser(User user);


    Optional<ChessClubMembership> findByMembershipUserAndMembershipChessclub(User user, ChessClub chessClubName);

}
