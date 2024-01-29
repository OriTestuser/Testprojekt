package Gruppe.C.Backend.ChessGame;

import lombok.Data;

@Data
public class PGNDTO {
    private String PGN;


    // Standardkonstruktor
    public PGNDTO() {
    }

    // Konstruktor mit übergebenem move als String & neuem Punkestand des Users
    public PGNDTO(String PGN) {
        this.PGN = PGN;

    }
}
