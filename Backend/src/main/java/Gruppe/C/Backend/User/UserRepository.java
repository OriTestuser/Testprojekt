package Gruppe.C.Backend.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User getUserByEmail (String email); //Email wird als Benutzername angegeben, daher wird danach gesucht
    Optional<User> findUserByEmail(String email);
    Optional<User> findById(Long id); //User anhand seiner ID in der Datenbank finden

    User getUserById(Long id);

    //Liste mit allen Spielern in absteigender Reihenfolge zurückgeben
    List<User> findAllByOrderByPointsDesc();

    //Prüfen, ob User bereits eine Mitgliedschaft in einem bestimmten Schachclub hat
    //boolean existsByChessClubMemberships_Membership_chessclub_NameAndId(String chessClubName, Long userId);

}