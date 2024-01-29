package Gruppe.C.Backend.Chat;

import Gruppe.C.Backend.User.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("chat")
@CrossOrigin("*")
public class ChatController {

    ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chatWithFriend")
    public ResponseEntity<Chat> createChatWithFriend (@RequestParam("activeUserId") Long activeUserId, @RequestParam("friendOfUserId") Long friendOfUserId) {
        return chatService.newChatWithFriend(activeUserId, friendOfUserId);
    }

    @PostMapping("/sendMessage")
    public ResponseEntity<Chat> sendMessage (@RequestParam("senderId") Long senderId, @RequestParam("receiverId") Long receiverId, @RequestParam("message") String message) {
        return chatService.sendMessage(senderId, receiverId, message);
    }

    @GetMapping ("/getMessagesFromChatWithFriend")
    public ResponseEntity<List<Messages>> getMessagesFromChatWithFriend(@RequestParam("chatId") Long chatId) {
        return chatService.getMessagesFromChatWithFriend(chatId);
    }

    @PostMapping("/createGroupchat")
    public ResponseEntity<GroupChat> createGroupChat(@RequestParam("creatorId") Long creatorId, @RequestParam("groupName") String groupName, @RequestBody List<User> invitedFriends) {
        return chatService.createGroupChat(creatorId, groupName, invitedFriends);
    }

    @PostMapping("/sendMessageInGroup")
    public ResponseEntity<GroupChat> sendMessageInGroup(@RequestParam("senderId") Long senderId, @RequestParam("message") String message, @RequestParam("groupName") String groupName){
        return chatService.sendMessageInGroup(senderId, message, groupName);
    }

    @GetMapping("/getChatWithFriend")
    public ResponseEntity<GroupChat> getGroupchat (@RequestParam("userId") Long userId, @RequestParam("groupName") String groupName) {
        return chatService.getGroupChat(userId, groupName);
    }

    @PutMapping("/addFriendToGroup")
    public ResponseEntity<GroupChat> addFriendToGroup(@RequestParam("friendId") Long friendId, @RequestParam("groupName") String groupName){
        return chatService.addFriendToGroup(friendId, groupName);
    }

    @GetMapping("/showGroupMembers")
    public ResponseEntity<Set<User>> showGroupMembers(@RequestParam("groupChatId") Long groupChatId){
        return chatService.showGroupMembers(groupChatId);
    }

    @GetMapping("/showGroupChats")
    public ResponseEntity<List<GroupChat>> showGroupChats(@RequestParam("userId") Long userId){
        return chatService.showGroupChats(userId);
    }

    @GetMapping("/getMessagesFromGroupChat")
    public ResponseEntity<List<Messages>> getMessagesFromGroupChat(@RequestParam("groupChatId") Long groupChatId) {
        return chatService.getMessagesFromGroupChat(groupChatId);
    }

    @PostMapping("/editMessageInChat")
    public ResponseEntity<Messages> editMessageInChat(@RequestParam("chatId") Long chatId, @RequestParam("newMessage") String newMessage, @RequestBody Messages messageToEdit) {
        return chatService.editMessageInChat(chatId, messageToEdit, newMessage);
    }

    @PostMapping("/editMessageInGroupChat")
    public ResponseEntity<Messages> editMessageInGroupChat(@RequestParam("groupChatId") Long groupChatId, @RequestParam("newMessage") String newMessage, @RequestBody Messages messageToEdit) {
        return chatService.editMessageInGroupChat(groupChatId, messageToEdit, newMessage);
    }

    @PostMapping("/openChessClubChat")
    public ResponseEntity<ChessClubChat> openChessClubChat(@RequestParam("activeUserId") Long activeUserId, @RequestParam("chessClubName") String chessClubName){
        return chatService.openChessClubChat(activeUserId, chessClubName);
    }

    @PostMapping("/sendMessageInChessClubChat")
    public ResponseEntity<ChessClubChat> sendMessageInChessClub(@RequestParam("senderId") Long senderId, @RequestParam("message") String message, @RequestParam("chessClubName") String chessClubName) {
        return chatService.sendMessageInChessClub(senderId, message, chessClubName);
    }

    @GetMapping("/getMessagesFromChessClub")
    public ResponseEntity<List<Messages>> getMessagesFromChessClub(@RequestParam("chessClubChatId") Long chessClubChatId) {
        return chatService.getMessagesFromChessClub(chessClubChatId);
    }

    @PostMapping("/editMessageInChessClubChat")
    public ResponseEntity<Messages> editMessageInChessClubChat(@RequestParam("chessClubName") String chessClubName, @RequestParam("newMessage") String newMessage, @RequestBody Messages messageToEdit){
        return chatService.editMessageInChessClubChat(chessClubName, messageToEdit, newMessage);
    }

    @DeleteMapping("/deleteMessage")
    public ResponseEntity<Boolean> deleteMessage (@RequestParam("messageId") Long messageId) {
        return chatService.deleteMessage(messageId);
    }

    @PutMapping("/setMessageRead")
    public ResponseEntity<Messages> setMessageRead(@RequestParam("messageId") Long messageId, @RequestParam("read") boolean read){
        return chatService.setMessageRead(messageId, read);
    }

}






