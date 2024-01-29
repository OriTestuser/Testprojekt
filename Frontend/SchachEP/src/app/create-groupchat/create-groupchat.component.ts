import { Component } from '@angular/core';
import {UserServiceService} from '../Service/user-service.service'
import {Router} from '@angular/router';
import {User} from '../Model/User';
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {ChatServiceService} from "../Service/chat-service.service";
import {GroupChat} from "../Model/GroupChat";
import {group} from "@angular/animations";

@Component({
  selector: 'app-create-groupchat',
  templateUrl: './create-groupchat.component.html',
  styleUrls: ['./create-groupchat.component.css']
})
export class CreateGroupchatComponent {
  group:GroupChat;
  groupName:string='';
  senderId= this.userService.UserData.id as number;
  friends:User[]=[]
  invitedFriends:User[] = [];
  constructor(
    private router:Router,
    private userService:UserServiceService,
    private chatService:ChatServiceService,
    private friendsService:FriendsServiceService
  ) {
    this.group=new GroupChat();
  }
  ngOnInit(){
    this.group.sender=this.userService.UserData;


      const userId = this.userService.CurrentUserData.id as number;
      this.friendsService.getFriends(userId).subscribe((friends:any) => {
        this.friends = friends;
      });
  }
  createGroupchat(){
    console.log("groupName",this.groupName);
    console.log("id",this.senderId);
    console.log("invitedFriends",this.invitedFriends);

    this.chatService.createGroupchat(this.senderId,this.groupName,this.invitedFriends)
      .subscribe(
        (response)=>{
          this.group=response;
          console.log("success",this.group)
        },
        (error)=>{
          alert("Error to create Group")
        })
  }
    selectFriend(friend:User): void {
      const index = this.invitedFriends.findIndex((f:User) => f === friend);
      if (index !== -1) {
        this.invitedFriends.splice(index, 1);//delete selected
      } else {
      this.invitedFriends.push(friend); // Add if not selected
    }
      console.log(this.invitedFriends);
      console.log("groupName",this.groupName);
  }
}
