package Gruppe.C.Backend.ChessGame;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TimeStampDTO {
    private int indexInList;
    private LocalDateTime localDateTime;

    public TimeStampDTO(int indexInList, LocalDateTime localDateTime) {
        this.indexInList = indexInList;
        this.localDateTime = localDateTime;
    }
}
