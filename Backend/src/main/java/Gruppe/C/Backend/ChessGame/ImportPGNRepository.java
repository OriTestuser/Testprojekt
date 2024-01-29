package Gruppe.C.Backend.ChessGame;

import Gruppe.C.Backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImportPGNRepository extends JpaRepository<ImportPGN,Long> {

    Optional<ImportPGN> findById(Long id);

    String findByUser(User user);

    String findByUserId(Long userId);

    List<ImportPGN> findAllByUser (User user);
}
