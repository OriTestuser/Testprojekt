package Gruppe.C.Backend.ChessPuzzle;

import Gruppe.C.Backend.User.User;

import java.io.Serializable;

public class CompositeChessPuzzleKey implements Serializable {
    private Long puzzleId;
    private User player;
}
