package Gruppe.C.Backend.FriendList;

import Gruppe.C.Backend.Services.Mail;
import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendListService {
    private final FriendListRepository friendListRepository;
    //Zum Holen von User Objekten und Prüfen der Privatsphäreeinstellungen Zugriff auf userRespository nötig
    private final UserRepository userRepository;

    public FriendListService(FriendListRepository friendListRepository, UserRepository userRepository) {
        this.friendListRepository = friendListRepository;
        this.userRepository = userRepository;
    }

    //Freundesliste anzeigen
    //userId ist die UserID des Users, dessen Freunde ausgegeben werden sollen
    public ResponseEntity<List<User>> getExistingFriends(Long userId, Long requesterId) {
        //User, dessen Freundesliste angefragt wird, aus der userRepository DB holen
        Optional<User> userFound = userRepository.findById(userId);
        if(userFound.isPresent()) {
            //falls der anfragende User der User ist, dessen Freundeliste angezeigt werden soll, wird die privacy ignoriert
            if(userFound.get().isPrivacy() == false || userId == requesterId) {
                List<Friendship> listAddedFriendships = friendListRepository.findByUser1IdAndAcceptedTrue(userId);
                List<Friendship> listAcceptedFriendships = friendListRepository.findByUser2IdAndAcceptedTrue(userId);

                //gesamte Freundesliste erstellen
                List<Friendship> listAllFriendships = listAddedFriendships;
                listAllFriendships.addAll(listAcceptedFriendships);

                List<User> listAllFriends = new ArrayList<User>();

                //nur Freunde des Users ausgeben
                for(Friendship friendship : listAllFriendships) {
                    if(friendship.getUser1().getId()==userId) {
                        //User, für den die FriendList angefragt wurde, ist in user1 gespeichert: nur user2 als Freund ausgeben
                        if(!listAllFriends.contains(friendship.getUser2())) {
                            listAllFriends.add(friendship.getUser2());
                        }
                    }
                    else {
                        //User, für den die FriendList angefragt wurde, ist in user2 gespeichert: nur user1 als Freund ausgeben
                        if(!listAllFriends.contains(friendship.getUser1())) {
                            listAllFriends.add(friendship.getUser1());
                        }
                    }
                }

                return ResponseEntity.status(HttpStatus.OK).body(listAllFriends);
            }
            else {
                //falls die privacy auf true gesetzt wurde und nicht die eigene Freundesliste angefragt wird: forbidden & null zurückgeben
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }
        } else {
            //falls der User nicht gefunden wurde: keine Liste vorhanden, not_found & null zurückgeben
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @Transactional
    public ResponseEntity deleteFriend(Long friendId, Long requesterId) {
        //User-Objekte aus userRepository DB holen, weil die Methode friendListRepository.deleteByUser1AndUser2 User-Objekte erfordert
        Optional<User> friendUser = userRepository.findById(friendId);
        Optional<User> requesterUser = userRepository.findById(requesterId);

        if(friendUser.isPresent() && requesterUser.isPresent()) {
            //beide Fälle abdecken: zu löschender User kann sowohl als user1 als auch als user2 gespeichert sein
            friendListRepository.deleteByUser1AndUser2(friendUser.get(), requesterUser.get());
            friendListRepository.deleteByUser1AndUser2(requesterUser.get(), friendUser.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        else {
            //falls nicht beide User gefunden wurden: not found zurückgeben
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public Boolean acceptFriend(Long requesterId, Long myUserId ) {

            Friendship friendship = friendListRepository.getFriendshipByUser1IdAndUser2Id(requesterId, myUserId);
            friendship.setAccepted(true);
            friendListRepository.save(friendship);
            return true;

    }

    public Boolean denyFriendRequest(Long requesterId, Long myUserId ) {

        Friendship friendship = friendListRepository.getFriendshipByUser1IdAndUser2Id(requesterId, myUserId);
        //wenn noch nicht angenommen diese bedingung
        if(friendship.isAccepted()){
            return false;
        }

        friendListRepository.delete(friendship);
        return true;

    }

    public void sendFriendRequest(Long userId1, Long userId2) {
        //zu Long von user geändert

         User user = userRepository.getUserById(userId1); //User der Anfrage verschicken möchte

         User requestedUser = userRepository.getUserById(userId2); //User der Anfrage bekommt

        //empfänger, betreff und nachricht festlegen
         String empfaenger = requestedUser.getEmail();
         String betreff = "Neue Freundschaftsanfrage";
         String message = "Hallo! "+user.getFirstName()+" moechte mit dir befreundet sein";


        //repräsentiert Freundschaftsanfrage, accepted noch auf false, da Anfrage noch nicht akzeptiert wurde
         boolean friendshipExist =friendListRepository.findFriendshipByUser1IdAndUser2Id(userId1,userId2).isPresent();
         boolean friendshipExist2 =friendListRepository.findFriendshipByUser1IdAndUser2Id(userId2,userId1).isPresent();

         if(!friendshipExist && !friendshipExist2) {
             Friendship friendship = new Friendship(user, requestedUser); //neue Freundschaft erstellen

             friendListRepository.save(friendship); //Freundschaft wird in DB gespeichert, müsste durch ablehnen wieder gelöscht werden

             //Mail mit Freundschaftsanfrage verschicken
             Mail mail = new Mail(empfaenger, betreff, message);
             mail.sendMail();


         }


    }


    public List<User> showMyFriendRequests(Long userId) {

        Optional<User> requestedUser = userRepository.findById(userId); //user anhand übergebener id im repository finden

        if(requestedUser.isPresent()) {

            List<Friendship> friendRequests = friendListRepository.findByUser2IdAndAcceptedFalse(userId); //alle nicht akzeptierten freundschaften raussuchen
            List<User> requests = new ArrayList<>();

            for(Friendship friendship : friendRequests) {

                requests.add(friendship.getUser1()); //aus jeder Freundschaft den User1 in der requests-Liste speichern
                                                     // User1 ist person, die Anfrage verschickt hat
            }

            return requests;

        }
        return null;
    }



}




