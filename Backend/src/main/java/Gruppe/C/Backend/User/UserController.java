package Gruppe.C.Backend.User;

import Gruppe.C.Backend.ChessBot.ChessBot;
import Gruppe.C.Backend.ChessClub.ChessClub;
import Gruppe.C.Backend.ChessGame.ChessGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin("*") //Muss in alle Controller weil Frontend 8080 läuft
public class UserController {

    @Autowired
    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) { //Zugriff auf den UserService, durch Instanz der Klasse UserService
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public Boolean loginUser(String email, String password) { //login-daten werden an den UserService gegeben
        return userService.authenticate(email, password);
    }

    public Boolean loginWithTwoFA(User user, String twoFA) {
        return userService.authenticateTwoFA(user, twoFA);
    }

    @PostMapping("/userLogin")
    public ResponseEntity<User> userLogin(@RequestBody User login) {

        if (loginUser(login.getEmail(), login.getPassword())) { //wenn Authentifizierung erfolgreich
            userService.saveToken(login.getEmail()); //Token wird generiert und in der DB gespeichert
            User userLogged = userService.getUserByEmail(login); //neuen user erstellen, der auch den aktuellen token besitzt

            return ResponseEntity.status(HttpStatus.OK).body(userLogged);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }


    @PutMapping("/twoFactorAuthentication")
    public ResponseEntity<User> twoFactor(@RequestParam("userId") Long userFromLoginId, @RequestParam("twoFA") String twoFA) { //hier wird der User vom Login benötigt

        User userFromLogin = userRepository.getUserById(userFromLoginId);
        if (loginWithTwoFA(userFromLogin, twoFA)) { //Überprüfen, ob eingegebener Token mit dem aus der DB übereinstimmt

            return ResponseEntity.status(HttpStatus.OK).body(userFromLogin);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

    }
    //Zum erstellen eines Users

    @PostMapping(value = "/createUser")
    public ResponseEntity<User> createUser(@RequestBody User userRequest) {

        return ResponseEntity.ok(userService.createUser(userRequest));
    }

    //Setzt die Privacy einstellung auf privat oder öffentlich(man startet auf öffentlich)
    @PutMapping(value = "/updatePrivacy")
    public ResponseEntity<Boolean> updatePrivacy(@RequestBody User privacy) {
        return ResponseEntity.ok(userService.updatePrivacy(privacy));

    }

    //Profilansicht (man selbst oder Freunde; anhand der übergebenen userId finden)
    @GetMapping("/getProfile/{userId}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long userId) {
        //Aufruf der getUserProfile Methode im UserService auf, um das Benutzerprofil abzurufen
        Optional<User> user = userService.getUserProfile(userId);
        if (user.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(user.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    //3 zuletzt gespielte Partien
    @GetMapping("/getLastGames")
    public ResponseEntity<List<Object>> getLastGames(@RequestParam Long userId) {
        return userService.getLastGames(userId);
    }


    //Finden eines Schachspiels anhand von userId sowie timestamp
    @GetMapping("/findchessgame")
    public ResponseEntity<ChessGame> findChessGame(@RequestParam Long userId, @RequestParam LocalDateTime timeStamp) {
        return userService.findChessGame(userId, timeStamp);
    }


    //Finden eines Botspiels anhand von userId sowie timestamp
    @GetMapping("/findbotgame")
    public ResponseEntity<ChessBot> findBotGame(@RequestParam Long userId, @RequestParam LocalDateTime timeStamp) {
        return userService.findBotGame(userId, timeStamp);
    }



    //Finden eines Users anhand der E-Mail Adresse
    @GetMapping("/found")
    public ResponseEntity<User> findUserByEmailAdress(@RequestParam("email") String email) {
        Optional<User> user = userService.findUserByEmailAdress(email);
        if (user.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(user.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    //Liste mit erstellten sowie beigetretenen Schachclubs eines Users
    @GetMapping("/chessclubs")
    public ResponseEntity<List<ChessClub>> getChessClubs(@RequestParam("userId") Long userId) {
        //Aufruf der getChessClubs Methode im UserService, um die ChessClubs abzurufen
        return userService.getChessClubs(userId);
    }

}