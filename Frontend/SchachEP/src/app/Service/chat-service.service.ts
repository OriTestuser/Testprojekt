import { Injectable } from '@angular/core';
import { Chat } from "../Model/Chat";
import { GroupChat } from "../Model/GroupChat"
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserServiceService} from './user-service.service'
import {Friendship} from '../Model/Friendship'
import {FriendsServiceService} from "./friends-service.service";
import {User} from "../Model/User";
import {Message} from "../Model/Message";
import {ChessClubChat} from "../Model/ChessClubChat";
import {ChessClub} from "../Model/ChessClub";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
 private ChatserviceURL: string;
 chatWithFriend:Chat;
 chatInGroup:GroupChat;
  chatInClub:ChessClubChat;

  constructor(private http: HttpClient ,
              private userService: UserServiceService,
              private friendService: FriendsServiceService) {
    this.ChatserviceURL = 'http://localhost:8080/chat';
    this.chatWithFriend=new Chat();
    this.chatInGroup=new GroupChat();
    this.chatInClub=new ChessClubChat();
  }
  public createChatWithFriend(activeUserId:number,friendOfUserId:number){
    const params = new HttpParams()
      .set('activeUserId',activeUserId)
      .set('friendOfUserId',friendOfUserId)
    return this.http.post<Chat>(this.ChatserviceURL + "/chatWithFriend",params);
  }
public sendMessage(sendId:number,receiverId:number, message:string){
  const params=new HttpParams()
    .set('senderId',sendId)
    .set('receiverId',receiverId)
    .set('message',message)
  return this.http.post<Chat>(this.ChatserviceURL + "/sendMessage",params)
}
public createGroupchat(creatorId:number, groupName:string,invitedFriends:User[]){
    const params=new HttpParams()
      .set("creatorId",creatorId)
      .set("groupName",groupName);
    return this.http.post<GroupChat>(`${this.ChatserviceURL}/createGroupchat`,invitedFriends,{params})
}
public getMessagesFromChatWithFriend(chatId:number,activeUserId:number){
    const params = new HttpParams()
      .set("chatId",chatId)
      .set("activeUserId",activeUserId);
    return this.http.get<Message[]>(`${this.ChatserviceURL}/getMessagesFromChatWithFriend`, { params });
}
public sendMessageInGroup(senderId:number, message:string, groupName:string){
    const params=new HttpParams()
      .set("senderId",senderId)
      .set("message",message)
      .set("groupName",groupName);
    return this.http.post<GroupChat>(this.ChatserviceURL+"/sendMessageInGroup",params);
}
public getGroupChatWithFriend(userId:number,groupName:string){
    const params = new HttpParams()
      .set("userId",userId)
      .set("groupName",groupName);
    return this.http.get<GroupChat>(this.ChatserviceURL+"/getChatWithFriend",{params});
}
public addFriendToGroup(friendId:number,groupName:string){
    const params = new HttpParams()
      .set("friendId",friendId)
      .set("groupName",groupName);
    return this.http.put<GroupChat>(this.ChatserviceURL+"/addFriendToGroup",params);
}

public showGroupMembers(groupChatId:number){
    const params = new HttpParams()
      .set("groupChatId",groupChatId);
    return this.http.get<User[]>(this.ChatserviceURL+"/showGroupMembers",{params});
}
public showGroupChats(userId:number){
    const params = new HttpParams()
      .set("userId",userId);
    return this.http.get<GroupChat[]>(this.ChatserviceURL+"/showGroupChats",{params});
}
public editMessageInChat(chatId:number,newMessage:string,messageToEdit:Message){
    const params = new HttpParams()
      .set("chatId",chatId)
      .set("newMessage",newMessage);
    return this.http.post<Message>(this.ChatserviceURL+"/editMessageInChat",messageToEdit,{params});
}
public getMessagesFromGroupChat(groupChatId:number,activeUserId:number){
  const params = new HttpParams()
    .set("groupChatId",groupChatId)
    .set("activeUserId",activeUserId);
  return this.http.get<Message[]>(this.ChatserviceURL+"/getMessagesFromGroupChat",{params});
}
public editMessageInGroupChat(groupChatId:number,newMessage:string,messageToEdit:Message){
    const params = new HttpParams()
      .set("groupChatId",groupChatId)
      .set("newMessage",newMessage)
  return this.http.post<Message>(this.ChatserviceURL+"/editMessageInGroupChat",messageToEdit,{params});

}
public openChessClubChat(activeUserId:number,chessClubName:string){
    const params = new HttpParams()
      .set("activeUserId",activeUserId)
      .set("chessClubName",chessClubName);
    return this.http.post<ChessClubChat>(this.ChatserviceURL+"/openChessClubChat",params);
}
public sendMessageInChessClubChat(senderId:number,message:string,chessClubName:string){
    const params=new HttpParams()
      .set("senderId",senderId)
      .set("message",message)
      .set("chessClubName",chessClubName)
  return this.http.post<ChessClubChat>(this.ChatserviceURL+"/sendMessageInChessClubChat",params);
}
public getMessagesFromChessClub(chessClubChatId:number,activeUserId:number){
 const params = new HttpParams()
   .set("chessClubChatId",chessClubChatId)
   .set("activeUserId",activeUserId);
  return this.http.get<Message[]>(this.ChatserviceURL+"/getMessagesFromChessClub",{params});
}
public editMessageInChessClubChat(chessClubName:string,messageToEdit:Message,newMessage:string){
const params = new HttpParams()
  .set("chessClubName",chessClubName)
  .set("newMessage",newMessage)
  return this.http.post<Message>(this.ChatserviceURL+"/editMessageInChessClubChat",messageToEdit,{params});
}
public deleteMessage(messageId:number){
    const params=new HttpParams()
      .set("messageId",messageId);
    return this.http.delete<boolean>(this.ChatserviceURL+"/deleteMessage",{params})
}
public setMessageRead(messageId:number,read:boolean){
    const params=new HttpParams()
      .set("messageId",messageId)
      .set("read",read);
    return this.http.put<Message>(this.ChatserviceURL+"/setMessageRead",params);
}
}
