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
  selector: 'app-groupchat-list',
  templateUrl: './groupchat-list.component.html',
  styleUrls: ['./groupchat-list.component.css']
})
export class GroupchatListComponent {
  groupChatList:GroupChat[]|undefined;

  constructor(
    private router:Router,
    private chatService:ChatServiceService,
    private friendService:FriendsServiceService,
    private userService:UserServiceService
  ) {}
  ngOnInit(){
    if(this.userService.UserData.id){
    this.chatService.showGroupChats(this.userService.UserData.id).subscribe((response)=>{
      this.groupChatList=response;
      console.log("groupChatList",this.groupChatList);
    })
    }
  }
  selectGroup(group:GroupChat) {
    this.chatService.chatInGroup=group;
    console.log("chatingroup",this.chatService.chatInGroup);
    console.log("group",group);
    console.log("groupId",this.chatService.chatInGroup.groupChatId);
  }

  protected readonly group = group;
}
