package Gruppe.C.Backend.Chat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessagesRepository extends JpaRepository<Messages, Long> {

    Messages getMessagesByMessageId (Long messageId);
}
