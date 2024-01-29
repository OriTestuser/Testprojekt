package Gruppe.C.Backend.User;

public class UserNotFoundException extends RuntimeException {

    //Exception, falls Benutzername inkorrekt
    public UserNotFoundException (String message) {
        super(message);
    }
}
