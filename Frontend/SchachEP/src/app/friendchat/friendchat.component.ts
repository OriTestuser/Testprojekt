import {Component} from '@angular/core';
import {UserServiceService} from '../Service/user-service.service'
import {Router} from '@angular/router';
import {User} from '../Model/User';
import {ProfilMainComponent} from '../profil-main/profil-main.component';
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {ChatServiceService} from "../Service/chat-service.service";
import {Chat} from "../Model/Chat";
import {Message} from "../Model/Message";
import {forkJoin, observable} from 'rxjs';
import {concatMap} from "rxjs";


@Component({
  selector: 'app-friendchat',
  templateUrl: './friendchat.component.html',
  styleUrls: ['./friendchat.component.css']
})
export class FriendchatComponent {
  changeMessage: string = "";
  Messages: Message[] = [];
  sendMessage: Chat;
  timer: any;
  message: string | undefined;
  chatWithFriend1: Chat | undefined;
  editModes: { [key: number]: boolean } = {};
  newMessage: string | undefined;

  constructor(private router: Router,
              public userService: UserServiceService,
              private friendsService: FriendsServiceService,
              private chessGameService: ChessgameServiceService,
              public chatService: ChatServiceService) {
    this.sendMessage = new Chat();

  }

  ngOnInit() {
    this.showMessage();
    this.timer = setInterval(() => {
      this.showMessage();
    }, 5000); //recall the method with 20 second
  }

  ngOnDestroy() {
    clearInterval(this.timer); // stop the timer
  }

  resetFriendData() {
    this.userService.CurrentUserData = this.userService.UserData;
  }

  onSubmit() {
    const sendId = this.userService.UserData.id;
    const receiverId = this.userService.CurrentUserData.id;

    if (sendId && receiverId && this.message) {
      this.chatService.sendMessage(sendId, receiverId, this.message).subscribe(
        (response) => {
          this.sendMessage = response;
          this.chatService.chatWithFriend = response;
          this.message = '';
          console.log("response", response);
          console.log("sendMessage", this.sendMessage);


        },
        (error) => {
          this.errorToSendMessage();
        })
    }
    this.message='';
    this.showMessage();
  }

  errorToSendMessage() {
    alert("errorToSendMessage");
  }
  showMessage() {
    if (this.userService.CurrentUserData.id && this.userService.UserData.id) {
      const createChatWithFriendCall1 = this.chatService.createChatWithFriend(this.userService.CurrentUserData.id, this.userService.UserData.id);
      const createChatWithFriendCall2 = this.chatService.createChatWithFriend(this.userService.UserData.id, this.userService.CurrentUserData.id);

      forkJoin([createChatWithFriendCall1, createChatWithFriendCall2]).pipe(
        concatMap(([response1, response2]) => {
          this.chatService.chatWithFriend = response1;
          this.chatWithFriend1 = response2;
          console.log(response1.chatId);
          console.log("message", response1.message);
          const getMessage1 = this.chatService.getMessagesFromChatWithFriend(this.chatService.chatWithFriend.chatId as number, this.userService.UserData.id as number);
          const getMessage2 = this.chatService.getMessagesFromChatWithFriend(this.chatWithFriend1.chatId as number, this.userService.UserData.id as number);

          return forkJoin([getMessage1, getMessage2]);
        }),
        concatMap(([response1, response2]) => {
          this.Messages = response1.concat(response2);
          console.log(response1);
          console.log("Messages", this.Messages);

          // Sort Messages
          this.Messages.sort((a, b) => {
            const dateA = new Date(a.time as Date);
            const dateB = new Date(b.time as Date);
            if (dateA < dateB) {
              return -1; // Come first
            } else if (dateA > dateB) {
              return 1; // Come later
            } else {
              return 0;
            }
          });

          // Set messages as read for the user
          return forkJoin(this.Messages.map(message => {
            if (message.senderId !== this.userService.UserData.id||message.read) {
              message.read = true;
              return this.chatService.setMessageRead(message.messageId as number, message.read);
            }else{
              message.read =false;
            return this.chatService.setMessageRead(message.messageId as number,message.read);}
          }));
        })
      ).subscribe((responses: any[]) => {
        responses.forEach(response => {
          if (response) {
            console.log("messageId", response.messageId, " read", response.read);
          }
        });
      });
    }
  }



  editMessage(msg: Message) {
    this.editModes[msg.messageId as number] = true;
  }

  updateMessage(msg: Message) {
    if (this.chatService.chatWithFriend.chatId && this.changeMessage && msg) {
      this.chatService.editMessageInChat(this.chatService.chatWithFriend.chatId, this.changeMessage, msg).subscribe(
        (response) => {
          this.editModes[msg.messageId as number] = false; // disable editmode
          msg.message = response.message;
          msg.time = response.time;
          this.showMessage();
        },
        (error) => {
        }
      );
    }

  }

  delete(msg: Message) {
    if (msg.messageId)
      this.chatService.deleteMessage(msg.messageId).subscribe((response) => {
        console.log("delete", response);
        this.showMessage();
      })
  }


}
