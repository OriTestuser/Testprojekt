package Gruppe.C.Backend.ChessGame;
import lombok.Data;

@Data
public class BestMoveDTO {
    private String bestMove;
    private int newPointsOfUser;

    // Standardkonstruktor
    public BestMoveDTO() {
    }

    // Konstruktor mit übergebenem move als String & neuem Punkestand des Users
    public BestMoveDTO(String bestMove, int newPointsOfUser) {
        this.bestMove = bestMove;
        this.newPointsOfUser = newPointsOfUser;
    }
}

