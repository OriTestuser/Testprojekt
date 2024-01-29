package Gruppe.C.Backend.Chat;

import Gruppe.C.Backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface GroupChatRepository extends JpaRepository<GroupChat, Long> {

    GroupChat findGroupChatByGroupName (String groupName);
    GroupChat findGroupChatByGroupChatId(Long groupChatId);

    @Query("SELECT gc FROM GroupChat gc JOIN gc.groupMembers m WHERE m.id = :userId")
    List<GroupChat> findByMembersId(@Param("userId")Long userId);

    @Query("SELECT gc.groupMembers FROM GroupChat gc WHERE gc.groupChatId = :groupChatId")
    Set<User> findGroupMembersByGroupChatId(@Param("groupChatId") Long groupChatId);

}
