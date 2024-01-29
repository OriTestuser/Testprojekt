package Gruppe.C.Backend.Chat;

import Gruppe.C.Backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    Chat getChatByChatId (Long chatId);
    Optional<Chat> findChatBySenderAndReceiver (User sender, User receiver);
    Chat findChatByReceiverAndSender (User receiver, User sender);

}
