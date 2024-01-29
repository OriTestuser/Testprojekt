package Gruppe.C.Backend.FriendList;

import Gruppe.C.Backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendListRepository extends JpaRepository<Friendship, CompositeFriendshipKey> {

    //Freunde von einem User (Parameter userId) anzeigen, wo der zugehörige User als userid1 (Sender) einer Friendship gespeichert ist
    List<Friendship> findByUser1IdAndAcceptedTrue(@Param("id") Long userId); //Alle bestehenden Freundschaften (accepted=true) finden, wo der angefragte User userid1 entspricht
    //Freunde von einem User (Parameter userId) anzeigen, wo der zugehörige User als userid2 (Empfänger) einer Friendship gespeichert ist
    List<Friendship> findByUser2IdAndAcceptedTrue(@Param("id") Long userId); //Alle bestehenden Freundschaften (accepted=true) finden, wo der angefragte User userid2 entspricht

    List<Friendship> findByUser2IdAndAcceptedFalse(@Param("id") Long userId); //sucht alle noch nicht akzeptierten anfragen raus anhand des zweiten users

    //Friendship aus Datenbank löschen
    void deleteByUser1AndUser2(User user1, User user2);


    Friendship getFriendshipByUser1IdAndUser2Id(Long requesterId, Long myUserId);
    Optional<Friendship> findFriendshipByUser1IdAndUser2Id(Long requesterId, Long myUserId);


}