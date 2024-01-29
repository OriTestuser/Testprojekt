import {Component} from '@angular/core';
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {ChatServiceService} from "../Service/chat-service.service";
import {Chat} from "../Model/Chat";
import {Message} from "../Model/Message";
import {Router} from "@angular/router";
import {UserServiceService} from "../Service/user-service.service";
import {ClubServiceService} from "../Service/club-service.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-club-chat',
  templateUrl: './club-chat.component.html',
  styleUrls: ['./club-chat.component.css']
})
export class ClubChatComponent {
  changeMessage: string = "";
  editModes: { [key: number]: boolean } = {};
  timer: any;
  message: string = '';
  messages: Message[] | undefined;
  messagesWithUsernames: { message: Message; username: string }[] = [];

  constructor(private router: Router,
              public userService: UserServiceService,
              private friendsService: FriendsServiceService,
              public chatService: ChatServiceService,
              public clubService: ClubServiceService) {
  }

  ngOnInit() {
    this.getMessagesFromChessClub();
    console.log("messages", this.messages);
    this.timer = setInterval(() => {
      this.getMessagesFromChessClub();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer); // stop the timer
  }

  getMessagesFromChessClub() {
    if (this.clubService.CurrentClubData?.id && this.userService.UserData.id) {
      this.chatService.getMessagesFromChessClub(this.clubService.CurrentClubData.id, this.userService.UserData.id).subscribe((response) => {
        this.messages = response;
        response.forEach(message => {//send every message
          if (message.senderId !== this.userService.UserData.id) {//check if the sender is myself
            message.read = true;
            this.chatService.setMessageRead(message.messageId as number, message.read).subscribe((message)=>{
              console.log("messageId",message.messageId, " read",message.read);
            })

          }
        });
        this.messagesWithUsernames = [];
        const userProfileRequests = response
          .filter(msg => msg.senderId)
          .map(msg => this.userService.getUserProfile(msg.senderId as number));

        if (userProfileRequests.length > 0) {
          forkJoin(userProfileRequests).subscribe((Users) => {
            this.messagesWithUsernames = response.map((msg, index) => {
              if (msg.senderId) {
                const userProfile = Users.find(profile => profile.id === msg.senderId);
                const username = userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : '';
                return {message: msg, username};
              }
              return {message: msg, username: 'Unknown'};
            });

            this.messagesWithUsernames.sort((a, b) => {
              return (a.message.messageId as number) - (b.message.messageId as number);
            })
          })
        }
      })
    }
  }

  sendMessage() {
    console.log('id', this.userService.UserData.id);
    console.log("message", this.message);
    console.log("Name", this.clubService.CurrentClubData?.chessClubName);
    if (this.userService.UserData.id && this.message && this.clubService.CurrentClubData?.chessClubName) {
      this.chatService.sendMessageInChessClubChat(this.userService.UserData.id, this.message, this.clubService.CurrentClubData.chessClubName).subscribe((response) => {
        console.log("sendMessage", response);
        this.getMessagesFromChessClub();
      })
    }
    this.message = "";

  }

  delete(msg: Message) {
    if (msg.messageId)
      this.chatService.deleteMessage(msg.messageId).subscribe((response) => {
        console.log("delete", response);
        this.getMessagesFromChessClub();
      })
  }
  track(index: number, msg: any) {
    return msg.message.messageId;//track the messageId, to sortBy id
  }
  editMessage(msg: Message) {
    this.editModes[msg.messageId as number] = true;
  }
  updateMessage(msg: Message) {
    console.log("ClubId", this.chatService.chatInClub.chatName);
    console.log("msg", msg);
    if (this.chatService.chatInClub.chatName && msg) {
      this.chatService.editMessageInChessClubChat(this.chatService.chatInClub.chatName,  msg,this.changeMessage).subscribe((response) => {
        this.editModes[msg.messageId as number] = false;
        msg.message=response.message;
        msg.time=response.time;
        this.getMessagesFromChessClub();
      })
    }
  }
}
