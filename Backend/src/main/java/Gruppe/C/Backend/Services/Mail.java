package Gruppe.C.Backend.Services;
import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;
import java.util.Properties;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.Data;

@Data
public class Mail {

    private String sender = "schachep@gmx.de";  // von dieser Mailadresse wird die Mail verschickt
    private String pw = "SchachEP1234C!"; // PW vom SchachEP-Postfach
    private String receiver;
    private String reference;
    private String message;

    //Konstruktor für der versenden von Mails --> hat Empfänger, Betreff und Nachricht
    public Mail(String receiver, String reference, String message) {
        this.receiver = receiver;
        this.reference = reference;
        this.message = message;
    }

    public void sendMail() {

        Properties properties = System.getProperties();

        properties.put("mail.transport.protocol", "smtp"); //Protokoll für das Versenden von Mails wird festgelegt
        properties.put("mail.smtp.host", "mail.gmx.net"); //Ausgangsserver von gmx
        properties.put("mail.smtp.port", "587"); //Port von Ausgangsserver
        properties.put("mail.smtp.auth", true); //Aktiviert die Authentifizierung beim Ausgangsserver
        properties.put("mail.smtp.user", sender); //hier wird E-Mail-Adresse (SchachEP@gmx.de) als Benutzername gesetzt
        properties.put("mail.smtp.password", pw); //hier wird das PW "SchachEP1234C!" eingegeben
        properties.put("mail.smtp.starttls.enable", true); //Aktivierung von STARTTLS --> wird bei gmx zum Versenden der Mails benötigt
        properties.put("mail.smtp.ssl.protocols", "TLSv1.2"); //Legt Protkoll für verschlüsselte Kommunikation fest --> hier TLS Version 1.2


        // Authenticator für die Verwaltung der Anmeldeinformationen bei der Mail-Authentifizierung
        Authenticator authenticator = new Authenticator() {

            // protected, wegen Anmeldedaten
            // die Methode PasswordAuthentication gibt die Anmeldedaten zurück
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("schachep@gmx.de", "SchachEP1234C!");
            }
        };

        // Erstellen einer Session-Instanz für die E-Mail-Kommunikation
        // Enthält die oben hinzugefügten properties und die Anmeldedaten
        Session session = Session.getInstance(properties, authenticator);
        // zeichnet Informationen über den Verlauf der E-Mail-Kommunikation auf
        session.setDebug(true); // hilfreich für Fehlerbehebung


        try {
            // message auf basis der erstellten session wird erstellt
            MimeMessage mimeMessage = new MimeMessage(session);
            // Empfänger der Mail wird erstellt
            InternetAddress addressTo = new InternetAddress(receiver);
            // der oben erstellte Empfänger wird als Hauptempfänger festgelegt (nicht CC o.ä.)
            mimeMessage.setRecipient(Message.RecipientType.TO, addressTo);
            // Absenderadresse wird festgelegt --> SchachEP@gmx.de
            mimeMessage.setFrom(new InternetAddress(sender));
            // Betreff wird festgelegt
            mimeMessage.setSubject(reference);
            // Nachricht in HTML-Formatierung wird festgelegt
            mimeMessage.setContent("<h3>"+this.message+"</h3>", "text/html");
            // Nachricht wird mithilfe von Transport.send() verschickt
            Transport.send(mimeMessage);

        }

        catch (MessagingException exception) { // Falls fehler während Sende-Vorgang auftritt
            exception.printStackTrace(); // Gibt Fehlermeldung auf der Konsole aus
        }



    }

      /* public static void main(String[] args) {
        String empfaenger = "elka8603@icloud.com";
        String betreff = "Test-Mail";
        String nachricht = "Hallo, dies ist eine Test-Nachricht";

        Mail mail = new Mail(empfaenger, betreff, nachricht);
        mail.sendMail();

    }

       */




}
