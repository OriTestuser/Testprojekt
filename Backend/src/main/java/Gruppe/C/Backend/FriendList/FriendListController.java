package Gruppe.C.Backend.FriendList;

import Gruppe.C.Backend.User.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("friends")
@CrossOrigin("*") //Muss in alle Controller weil Frontend 8080 läuft
public class FriendListController {
    private final FriendListService friendListService;

    public FriendListController(FriendListService friendListService) {
        this.friendListService = friendListService;
    }

    @GetMapping("/view-friendlist/userid={userId}/requesterid={requesterId}")
    //userId für den User, dessen FriendList angefragt wird
    //requesterId für den eingeloggten User, der die friendList anfragt
    public ResponseEntity<List<User>> getExistingFriends(@PathVariable Long userId, @PathVariable Long requesterId) {
        ResponseEntity<List<User>> getExistingFriendsResponse = friendListService.getExistingFriends(userId, requesterId);
        return getExistingFriendsResponse;
    }

    @DeleteMapping("/delete-friend/friendid={friendId}/requesterid={requesterId}")
    //friendId für den User, der als Freund entfernt werden soll
    //requesterId für den eingeloggten User, der dies anfragt
    public ResponseEntity deleteFriend(@PathVariable Long friendId, @PathVariable Long requesterId) {
        ResponseEntity deleteFriendResponse = friendListService.deleteFriend(friendId, requesterId);
        return deleteFriendResponse;
    }
    @PutMapping(value = "/acceptFriend")
    public ResponseEntity<Boolean> acceptFriend(@RequestParam ("userId1") Long userId1,@RequestParam("userId2") Long userId2) {

        return ResponseEntity.ok(friendListService.acceptFriend(userId1,userId2));
    }
    @DeleteMapping(value = "/denyFriendRequest")
    public ResponseEntity<Boolean>denyFriendRequest (@RequestParam ("userId1") Long userId1,@RequestParam("userId2") Long userId2) {

        return ResponseEntity.ok(friendListService.denyFriendRequest(userId1,userId2));
    }

    @PostMapping("/sendRequest")
    public ResponseEntity<Boolean> sendRequest(@RequestParam("userId1") Long userId1, @RequestParam("userId2") Long userId2)  {

        friendListService.sendFriendRequest(userId1, userId2); //Methode aus dem service mit übergebenen parametern aufrufen

        return ResponseEntity.ok(true);

    }

    @GetMapping("/showMyFriendRequests")
    public ResponseEntity<List<User>> showMyFriendRequests(@RequestParam("userId") Long userId) {

        List<User> myFriendRequests = friendListService.showMyFriendRequests(userId); //Liste mit Usern erestellen

        if(myFriendRequests != null) {
            return ResponseEntity.status(HttpStatus.OK).body(myFriendRequests);
        }

        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}