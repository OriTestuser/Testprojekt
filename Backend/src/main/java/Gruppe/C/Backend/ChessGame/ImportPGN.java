package Gruppe.C.Backend.ChessGame;

import Gruppe.C.Backend.User.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ImportPGN {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String PGN;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User user;


}
