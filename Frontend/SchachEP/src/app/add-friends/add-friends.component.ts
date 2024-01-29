import { Component } from '@angular/core';
import {ChatServiceService} from "../Service/chat-service.service";
import{User} from "../Model/User";
import{UserServiceService} from "../Service/user-service.service";
import{FriendlistComponent} from "../friendlist/friendlist.component";
import {Router} from "@angular/router";
import {FriendsServiceService} from "../Service/friends-service.service";

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent {
  friends:User[]|undefined;
  groupMembers:User[]|undefined;
constructor( private router:Router,
             private userService:UserServiceService,
             private chatService:ChatServiceService,
             private friendsService:FriendsServiceService) {
}
  ngOnInit(){
    const userId = this.userService.UserData.id as number;
    this.friendsService.getFriends(userId).subscribe((friends:any) => {
      this.friends = friends;
    });
  }

  addFriend(friend:User){
  if(this.chatService.chatInGroup.groupName&&friend.id){
    this.chatService.addFriendToGroup(friend.id,this.chatService.chatInGroup.groupName).subscribe((response)=>{
      alert("Success")
    },(error)=>{
      alert("error")
    })
  }

  }
  checkInGroup(friend:User):boolean{
  if(this.chatService.chatInGroup.groupChatId){
    this.chatService.showGroupMembers(this.chatService.chatInGroup.groupChatId).subscribe((response)=>{
      this.groupMembers=response;
    })
  }
  const index = this.groupMembers?.findIndex((f)=>f.id==friend.id);
    return index != -1;//if friend is in group,return true.
  }


}
