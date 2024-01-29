import {Component} from '@angular/core';
import {UserServiceService} from '../Service/user-service.service'
import {Router} from '@angular/router';
import {User} from '../Model/User';
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {ChatServiceService} from "../Service/chat-service.service";
import {GroupChat} from "../Model/GroupChat";
import {Message} from "../Model/Message";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent {
  editModes: { [key: number]: boolean } = {};
  changeMessage: string = "";
  messagesWithUsernames: { message: Message; username: string }[] = [];
  timer: any;
  message: string = "";
  messages: Message[] | undefined;
  member: User[] | undefined;
  name: User;
  private lastMessageId: number | undefined;

  constructor(
    private router: Router,
    private chatService: ChatServiceService,
    private friendService: FriendsServiceService,
    public userService: UserServiceService
  ) {
    this.name = new User()
  }

  ngOnInit() {
    // this.showMessageByShowGroup();
    this.showMessage();
    console.log("Message", this.messagesWithUsernames);
    console.log("message", this.messages);
    this.timer = setInterval(() => {
      this.showMessage();
      console.log("refreshMessage", this.messages)
      // this.showMessageByShowGroup();
    }, 5000); //recall the method with 5 second

  }

  ngOnDestroy() {
    clearInterval(this.timer); // stop the timer
  }

  showMessageByShowGroup() {
    if (this.userService.UserData.id) {
      this.chatService.showGroupChats(this.userService.UserData.id).subscribe((response) => {
        console.log("response", response);
        const group = response.find(item => item.groupChatId == this.chatService.chatInGroup.groupChatId);
        this.messages = group?.messages;
      })
      if (this.messages && this.messages.length > 0) {
        const lastMessage = this.messages[this.messages.length - 1];
        this.lastMessageId = lastMessage.messageId;
        console.log("Last Message Id:", this.lastMessageId);
      }
      this.messagesWithUsernames = [];
      if (this.messages)
        for (const msg of this.messages) {
          if (msg.senderId)
            this.userService.getUserProfile(msg.senderId).subscribe((userProfile) => {
              const username = `${userProfile.firstName} ${userProfile.lastName}`;
              this.messagesWithUsernames.push({message: msg, username});
            });
        }
    }
  }

  public sendMessageInGroup() {
    if (this.userService.UserData.id && this.chatService.chatInGroup.groupName) {
      this.chatService.sendMessageInGroup(this.userService.UserData.id, this.message, this.chatService.chatInGroup.groupName).subscribe((response) => {
        console.log("success", response);
        this.message = "";
        this.showMessage();
      })
    }
  }

  showMessage() {

    if (this.chatService.chatInGroup.groupChatId && this.userService.UserData.id) {
      this.chatService.getMessagesFromGroupChat(this.chatService.chatInGroup.groupChatId, this.userService.UserData.id).subscribe((messages) => {
        this.messages = messages;
        console.log("response", messages);
        messages.forEach(message => {//send every message
          if (message.senderId !== this.userService.UserData.id) {//check if the sender is myself
            message.read = true;
            this.chatService.setMessageRead(message.messageId as number, message.read).subscribe((message)=>{
              console.log("messageId",message.messageId, " read",message.read);
            })

          }
        });
        this.messagesWithUsernames = [];
        const userProfileRequests = messages
          .filter(msg => msg.senderId)
          .map(msg => this.userService.getUserProfile(msg.senderId as number));

        if (userProfileRequests.length > 0) {
          forkJoin(userProfileRequests).subscribe((Users) => {
            this.messagesWithUsernames = messages.map((msg) => {
              if (msg.senderId) {
                const userProfile = Users.find(profile => profile.id === msg.senderId);
                const username = userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : '';
                return {message: msg, username};
              }
              return {message: msg, username: ''};
            });

            this.messagesWithUsernames.sort((a, b) => {
              return (a.message.messageId as number) - (b.message.messageId as number);
            });
          }, (error) => {
            console.log("error");
          });
        }
      })
    }
  }

  track(index: number, msg: any) {
    return msg.message.messageId;//track the messageId, to sortBy id
  }

  editMessage(msg: Message) {
    this.editModes[msg.messageId as number] = true;
  }

  updateMessage(msg: Message) {
    console.log("GroupId", this.chatService.chatInGroup.groupChatId);
    console.log("msg", msg);
    if (this.chatService.chatInGroup.groupChatId && msg) {
      this.chatService.editMessageInGroupChat(this.chatService.chatInGroup.groupChatId, this.changeMessage, msg).subscribe((response) => {
        this.editModes[msg.messageId as number] = false;
        msg.message=response.message;
        msg.time=response.time;
        this.showMessage();
      })
    }
  }
  delete(msg:Message){
    if(msg.messageId)
    this.chatService.deleteMessage(msg.messageId).subscribe((response)=>{
      console.log("delete",response);
      this.showMessage();
    })
  }
}
