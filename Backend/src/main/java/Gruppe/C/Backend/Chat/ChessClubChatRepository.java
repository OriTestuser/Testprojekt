package Gruppe.C.Backend.Chat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChessClubChatRepository extends JpaRepository<ChessClubChat, Long> {

    ChessClubChat findChessClubChatByChatName (String chessClubChat);

    ChessClubChat findChessClubChatByChessClubChatId (Long chessClubChatId);
}
