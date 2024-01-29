package Gruppe.C.Backend.ChessBot;

import lombok.Data;

@Data
public class MoveDTO {

    private String bestMove;
    private int points;
    private String fen;

    public MoveDTO() {
    }

    public MoveDTO(String bestMove, String fen) {
        this.bestMove = bestMove;
    }

    public MoveDTO(String bestMove, int points) {
        this.bestMove = bestMove;
        this.points = points;
    }


}
