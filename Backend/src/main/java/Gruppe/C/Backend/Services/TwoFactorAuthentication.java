package Gruppe.C.Backend.Services;

import Gruppe.C.Backend.User.User;
import lombok.Data;

@Data
public class TwoFactorAuthentication {
    public String supercode = "123456";
    private String token;


    // Methode zum generieren des zweiten Faktors
    public String  generateToken(int length) {

        String numericString = "0123456789"; // token soll aus diesen Zahlen bestehen

        StringBuilder stringBuilder = new StringBuilder(length); //String mit übergebener Länge erstellen

        for(int i=0; i<length; i++) {

            int index = (int) (numericString.length() * Math.random()); // random Nummer index wird erstellt

            stringBuilder.append(numericString.charAt(index)); //nummer an stelle "index" von numericString wird an den stringBuilder gehangen
        }

        String token = stringBuilder.toString();

        return token;
    }


    public void generateToken(User user) {
        String factor = this.generateToken(6); //Token mit der Längen 6 wird generiert
        String receiver = user.getEmail(); //empfänger setzten
        String reference = "Zwei Faktor Authentifizierung"; //betreff für mail
        String message = "Willkommen bei SchachEP! \n Dein Token lautet: " + factor + "."; //nachricht mit generiertem token

        this.setToken(factor);


        // Mail mit zweitem Faktor
        Mail mail = new Mail(receiver, reference, message);
        mail.sendMail();

    }
    public boolean checkToken (User user, String factor) { //Überprüfen, ob übergebener Token dem Token aus DB oder dem supertoken entspricht

        if(factor.equals(this.getToken()) || factor.equals(this.supercode)) {
            return true;
        }

        else {
            return false;
        }


    }

    public TwoFactorAuthentication() {

    }
}
