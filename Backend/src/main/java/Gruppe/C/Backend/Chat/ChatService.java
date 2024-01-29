package Gruppe.C.Backend.Chat;

import Gruppe.C.Backend.ChessClub.ChessClub;
import Gruppe.C.Backend.ChessClub.ChessClubRepository;
import Gruppe.C.Backend.ChessClub.ChessClubService;
import Gruppe.C.Backend.User.User;
import Gruppe.C.Backend.User.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ChatService {

    ChatRepository chatRepository;
    UserRepository userRepository;
    GroupChatRepository groupChatRepository;
    ChessClubRepository chessClubRepository;
    ChessClubService chessClubService;
    ChessClubChatRepository chessClubChatRepository;
    MessagesRepository messagesRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public ChatService(ChatRepository chatRepository, UserRepository userRepository, GroupChatRepository groupChatRepository, ChessClubRepository chessClubRepository, ChessClubService chessClubService, ChessClubChatRepository chessClubChatRepository,MessagesRepository messagesRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.groupChatRepository = groupChatRepository;
        this.chessClubRepository = chessClubRepository;
        this.chessClubService = chessClubService;
        this.chessClubChatRepository = chessClubChatRepository;
        this.messagesRepository = messagesRepository;
    }

    public Boolean checkUser (Long userId){
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent();
    }

    public Boolean checkChatWithUser(User user1, User user2){
        Optional<Chat> chat = chatRepository.findChatBySenderAndReceiver(user1, user2);
        return chat.isPresent();
    }

    @Transactional
    public ResponseEntity<Chat> newChatWithFriend (Long activeUserId, Long friendOfUserId) {

        if(checkUser(activeUserId) && checkUser(friendOfUserId)) {

            User activeUser = userRepository.getUserById(activeUserId);
            User friendOfUser = userRepository.getUserById(friendOfUserId);

            if(!checkChatWithUser(activeUser, friendOfUser)){
                Chat chat = new Chat();
                List<Messages> messages = new ArrayList<>();
                chat.setSender(activeUser);
                chat.setReceiver(friendOfUser);
                chat.setMessages(messages);
                chat = entityManager.merge(chat);
                chatRepository.save(chat);
                return ResponseEntity.status(HttpStatus.OK).body(chat);

            }

            else {

                Chat chat = chatRepository.findChatByReceiverAndSender(activeUser, friendOfUser);

                return ResponseEntity.status(HttpStatus.OK).body(chat);

            }
        }

        else {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }

    public ResponseEntity<Chat> sendMessage(Long senderId, Long receiverId, String message) {

        User sender = userRepository.getUserById(senderId);
        User receiver = userRepository.getUserById(receiverId);

        if(checkChatWithUser(sender, receiver)){

            Chat currentChat = chatRepository.findChatByReceiverAndSender(receiver, sender);
            LocalDateTime timeNow = LocalDateTime.now();
            Messages sendMessage = new Messages();
            sendMessage.setMessage(message);
            sendMessage.setTime(timeNow);
            sendMessage.setRead(false);
            sendMessage.setSenderId(senderId);
            sendMessage.setChat(currentChat);
            currentChat.getMessages().add(sendMessage);
            chatRepository.save(currentChat);

            return ResponseEntity.status(HttpStatus.OK).body(currentChat);
        }

        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public ResponseEntity<List<Messages>> getMessagesFromChatWithFriend(Long chatId) {

        Chat currentChat = chatRepository.getChatByChatId(chatId);

        List<Messages> messages = currentChat.getMessages();

        if(!messages.isEmpty()) {

            return ResponseEntity.status(HttpStatus.OK).body(messages);

        }

        else {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        }


    }


    @Transactional
    public ResponseEntity<GroupChat> createGroupChat (Long creatorId, String groupName, List<User> invitedFriends){

        if(checkUser(creatorId)){
            GroupChat existingGroup = groupChatRepository.findGroupChatByGroupName(groupName);
            if(existingGroup == null){

                GroupChat groupChat = new GroupChat();
                Set<User> members = new HashSet<>();

                members.add(userRepository.getUserById(creatorId));
                members.addAll(invitedFriends);

                groupChat.setGroupName(groupName);
                groupChat.setGroupMembers(members);

                groupChatRepository.save(groupChat);

                return ResponseEntity.status(HttpStatus.OK).body(groupChat);
            }

            else {
                System.out.println("Gruppenname ist schon vorhanden!");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(existingGroup);
            }

        }

        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }


    public ResponseEntity<GroupChat> sendMessageInGroup(Long senderId, String message, String groupName) {

        User sender = userRepository.getUserById(senderId);
        GroupChat groupChat = groupChatRepository.findGroupChatByGroupName(groupName);

        if(groupChat != null && sender != null && groupChat.getGroupMembers() != null) {

            LocalDateTime timeNow = LocalDateTime.now();
            Messages sendMessage = new Messages();
            sendMessage.setMessage(message);
            sendMessage.setTime(timeNow);
            sendMessage.setRead(false);
            sendMessage.setSenderId(senderId);
            sendMessage.setGroupChat(groupChat);
            groupChat.getMessages().add(sendMessage);
            groupChatRepository.save(groupChat);

            return ResponseEntity.status(HttpStatus.OK).body(groupChat);

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }

    public ResponseEntity<GroupChat> getGroupChat(Long userId, String groupName) {

        User user = userRepository.getUserById(userId);
        GroupChat groupChat = groupChatRepository.findGroupChatByGroupName(groupName);

        if(user != null && groupChat != null) {
            return ResponseEntity.status(HttpStatus.OK).body(groupChat);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public ResponseEntity<GroupChat> addFriendToGroup (Long friendId, String groupName) {

        GroupChat groupChat = groupChatRepository.findGroupChatByGroupName(groupName);

        if(groupChat != null) {

            Set<User> members = groupChat.getGroupMembers();
            members.add(userRepository.getUserById(friendId));
            groupChatRepository.save(groupChat);

            return ResponseEntity.status(HttpStatus.OK).body(groupChat);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @Transactional
    public ResponseEntity<Set<User>> showGroupMembers(Long groupChatId) {

        GroupChat group = groupChatRepository.findGroupChatByGroupChatId(groupChatId);

        if(group != null) {

            Set<User> groupMembers = groupChatRepository.findGroupMembersByGroupChatId(groupChatId);
            return ResponseEntity.status(HttpStatus.OK).body(groupMembers);

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public ResponseEntity<List<GroupChat>> showGroupChats(Long userId){

        if(userRepository.findById(userId).isPresent()){
            List<GroupChat> memberInGroup = groupChatRepository.findByMembersId(userId);
            if(memberInGroup != null && !memberInGroup.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(memberInGroup);
            }
            else{
                System.out.println("User ist in keinem Gruppenchat");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        }
        System.out.println("User existiert nicht");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public ResponseEntity<List<Messages>> getMessagesFromGroupChat(Long groupChatId) {

        GroupChat groupChat = groupChatRepository.findGroupChatByGroupChatId(groupChatId);

        if(groupChat != null) {
            
            List<Messages> messages = groupChat.getMessages();

            if(!messages.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(messages);
            }

            else {
                System.out.println("No Messages in Chat");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }

        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }


    }

    public boolean checkIfMessageIsRead (Messages message) {
        if(message != null) {
            return message.isRead();
        }
        else {
            return false;
        }
    }



//   @Transactional
//    public ResponseEntity<Messages> editMessageInChat(Long chatId, Messages messageToEdit, String newMessage) {
//        Chat chat = chatRepository.getChatByChatId(chatId);
//        if(chat != null && messageToEdit != null && newMessage != null && checkIfMessageIsRead(messageToEdit)) {
//            List<Messages> allMessages = chat.getMessages();
//            for(Messages messages : allMessages) {
//                if(messages.getMessageId().equals(messageToEdit.getMessageId())) {
//                    System.out.println("Nachricht gefunden!");
//                    messageToEdit.setMessage(newMessage);
//                    chatRepository.save(chat);
//                    return ResponseEntity.status(HttpStatus.OK).body(messageToEdit);
//                }
//            }
//            System.out.println("Is chat managed? " + entityManager.contains(chat));
//            System.out.println("Chat wurde nicht gefunden");
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//       System.out.println("Invalid parameters or message not read");
//       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//
//   }
public ResponseEntity<Messages> editMessageInChat(Long chatId, Messages messageToEdit, String newMessage) {
    Chat chat = chatRepository.getChatByChatId(chatId);

    if(chat != null && messageToEdit != null && newMessage != null ) {
        List<Messages> allMessages = chat.getMessages();

        Optional<Messages> optionalMessage = allMessages.stream()
                .filter(message -> message.getMessageId().equals(messageToEdit.getMessageId()))
                .findFirst();

        if (optionalMessage.isPresent()) {
            Messages foundMessage = optionalMessage.get();
            foundMessage.setMessage(newMessage);
            chatRepository.save(chat);
            return ResponseEntity.status(HttpStatus.OK).body(foundMessage);
        }

        System.out.println("Chat managed? " + entityManager.contains(chat));
        System.out.println("Chat not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    System.out.println("Invalid parameters or unread message");
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
}


    public ResponseEntity<Messages> editMessageInGroupChat(Long groupChatId, Messages messageToEdit, String newMessage) {
        GroupChat groupChat = groupChatRepository.findGroupChatByGroupChatId(groupChatId);
        if (groupChat != null && messageToEdit != null && newMessage != null) {
            Optional<Messages> optionalMessage = groupChat.getMessages().stream()
                    .filter(message -> message.getMessageId().equals(messageToEdit.getMessageId()))
                    .findFirst();
            if (optionalMessage.isPresent()) {
                Messages foundMessage = optionalMessage.get();
                System.out.println("Message found!");
                foundMessage.setMessage(newMessage);
                groupChatRepository.save(groupChat);
                return ResponseEntity.status(HttpStatus.OK).body(messageToEdit);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @Transactional
    public ResponseEntity<ChessClubChat> openChessClubChat(Long activeUserId, String chessClubName) {

        ChessClub chessClub = chessClubRepository.findChessClubByChessClubName(chessClubName);

        if(chessClub != null) {

            if(chessClubChatRepository.findChessClubChatByChatName(chessClubName) == null) {
                ChessClubChat chessClubChat = new ChessClubChat();
                Set<User> chessClubMembers = chessClubService.getMembersByChessClub(chessClub);

                chessClubChat.setMembersOfChessClub(chessClubMembers);
                chessClubChat.setChatName(chessClubName);
                chessClubChatRepository.save(chessClubChat);

                return ResponseEntity.status(HttpStatus.OK).body(chessClubChat);
            }

            else {

                ChessClubChat chessClubChat = chessClubChatRepository.findChessClubChatByChatName(chessClubName);

                if(chessClubChat.getMembersOfChessClub().size() != chessClubService.getMembersByChessClub(chessClubChat.getChessClub()).size()) {
                    Set<User> currentMembers = chessClubChat.getMembersOfChessClub();
                    Set<User> checkMembers = chessClubService.getMembersByChessClub(chessClubChat.getChessClub());
                    currentMembers.addAll(checkMembers);
                    chessClubChat.setMembersOfChessClub(currentMembers);
                    chessClubChatRepository.save(chessClubChat);

                    }
                return ResponseEntity.status(HttpStatus.OK).body(chessClubChat);

            }

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }




    public ResponseEntity<ChessClubChat> sendMessageInChessClub(Long senderId, String message, String chessClubName) {

        User sender = userRepository.getUserById(senderId);
        ChessClubChat chessClubChat = chessClubChatRepository.findChessClubChatByChatName(chessClubName);
        if(chessClubChat != null && sender != null && chessClubChat.getMembersOfChessClub() != null) {

            LocalDateTime timeNow = LocalDateTime.now();
            Messages sendMessage = new Messages();
            sendMessage.setMessage(message);
            sendMessage.setTime(timeNow);
            sendMessage.setRead(false);
            sendMessage.setSenderId(senderId);
            sendMessage.setChessClubChat(chessClubChat);
            chessClubChat.getMessages().add(sendMessage);
            chessClubChatRepository.save(chessClubChat);

            return ResponseEntity.status(HttpStatus.OK).body(chessClubChat);

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }

    public ResponseEntity<List<Messages>> getMessagesFromChessClub(Long chessClubChatId) {

        ChessClubChat chessClubChat = chessClubChatRepository.findChessClubChatByChessClubChatId(chessClubChatId);

        if(chessClubChat != null){

            List<Messages> messages = chessClubChat.getMessages();

            if(!messages.isEmpty()) {

                return ResponseEntity.status(HttpStatus.OK).body(messages);
            }

            else {
                System.out.println("No Messages in Chat");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }

        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

//    public ResponseEntity<Messages> editMessageInChessClubChat(String chessClubName, Messages messageToEdit, String newMessage) {
//        ChessClubChat chessClubChat = chessClubChatRepository.findChessClubChatByChatName(chessClubName);
//        if(messageToEdit != null && newMessage != null && chessClubChat != null) {
//            List<Messages> allMessages = chessClubChat.getMessages();
//            for(Messages messages : allMessages) {
//                if(messages.getMessageId().equals(messageToEdit.getMessageId())) {
//                    System.out.println("Nachricht gefunden!");
//                    messageToEdit.setMessage(newMessage);
//                    chessClubChatRepository.save(chessClubChat);
//                }
//                return ResponseEntity.status(HttpStatus.OK).body(messageToEdit);
//            }
//
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//    }
public ResponseEntity<Messages> editMessageInChessClubChat(String chessClubName, Messages messageToEdit, String newMessage){
        ChessClubChat chessClubChat=chessClubChatRepository.findChessClubChatByChatName(chessClubName);
        if(messageToEdit != null && newMessage != null && chessClubChat!=null){
            Optional<Messages> optionalMessages=chessClubChat.getMessages().stream()
                    .filter(messages -> messages.getMessageId().equals(messageToEdit.getMessageId())).findFirst();
            if(optionalMessages.isPresent()){
                Messages foundMessage = optionalMessages.get();
                System.out.println("Message found!");
                foundMessage.setMessage(newMessage);
                chessClubChatRepository.save(chessClubChat);
                return ResponseEntity.status(HttpStatus.OK).body(messageToEdit);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
}
    //Nachrichten löschen
    public ResponseEntity<Boolean> deleteMessage (Long messageId) {

        Messages messageToDelete = messagesRepository.getMessagesByMessageId(messageId);
        if(messageToDelete != null) {

            if(!messageToDelete.isRead()) {
                messagesRepository.delete(messageToDelete);
                return ResponseEntity.status(HttpStatus.OK).body(true);
            }
            else {
                System.out.println("Nachricht wurde schon gelesen");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
            }

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
    }


    /* public Messages lastMessage(Chat chat) {
        List<Messages> messages = chat.getMessages();
        if (!messages.isEmpty()) {
            LocalDateTime latestTime = messages.get(0).getTime();
            Messages lastMessage = messages.get(0);
            for(Messages messages1 : messages){
                if(messages1.getTime().isAfter(latestTime)){
                    latestTime = messages1.getTime();
                    lastMessage = messages1;
                }
            }

            return lastMessage;
        }
        return null;
    }

    public Messages lastMessageGroup(GroupChat chat) {
        List<Messages> messages = chat.getMessages();
        if (!messages.isEmpty()) {
            LocalDateTime latestTime = messages.get(0).getTime();
            Messages lastMessage = messages.get(0);
            for(Messages messages1 : messages){
                if(messages1.getTime().isAfter(latestTime)){
                    latestTime = messages1.getTime();
                    lastMessage = messages1;
                }
            }

            return lastMessage;
        }
        return null;
    }

    public Messages lastMessageChessClub(ChessClubChat chat) {
        List<Messages> messages = chat.getMessages();
        if (!messages.isEmpty()) {
            LocalDateTime latestTime = messages.get(0).getTime();
            Messages lastMessage = messages.get(0);
            for(Messages messages1 : messages){
                if(messages1.getTime().isAfter(latestTime)){
                    latestTime = messages1.getTime();
                    lastMessage = messages1;
                }
            }

            return lastMessage;
        }
        return null;
    }

     */

    public ResponseEntity<Messages> setMessageRead(Long messageId, boolean read){

        Messages message = messagesRepository.getMessagesByMessageId(messageId);

        if(message != null) {

            message.setRead(read);
            messagesRepository.save(message);

            return ResponseEntity.status(HttpStatus.OK).body(message);
        }

        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}







