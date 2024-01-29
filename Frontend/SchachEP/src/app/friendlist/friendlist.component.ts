import {Component} from '@angular/core';
import {UserServiceService} from "../Service/user-service.service";
import {Router} from "@angular/router";
import {User} from '../Model/User'
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {ChatServiceService} from "../Service/chat-service.service";


@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent {
  friends: User[] = [];
  userFriendData = this.userService.CurrentUserData;
  userData: User = this.userService.UserData;

  constructor(private router: Router,
              public userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService,
              private chatService:ChatServiceService) {
  }

  ngOnInit(): void {

    const userId = this.userService.CurrentUserData.id as number;
    this.friendsService.getFriends(userId).subscribe((friends:any) => {
      this.friends = friends;
    });
  }
  selectFriend(friend: User) {
    this.userService.CurrentUserData = friend; // store current FriendID to CurrentUserData
  }
  createFriendChat(friend:User){
    if(this.userData.id&&friend.id) {
      this.userService.CurrentUserData = friend;
      this.chatService.createChatWithFriend(this.userData.id,friend.id).subscribe((response)=>{
        this.chatService.chatWithFriend=response;
        console.log(response);
      })
    }else{
      alert("Error")
    }

  }


  deleteFriend(deleteFriend: User) {
    this.friendsService.deleteFriend(deleteFriend.id as number).subscribe((response) => {
      if (response) {

      } else {// success and delete id
        this.friends = this.friends.filter((friend) => friend.id !== deleteFriend.id);
        console.log('Success to delete friend');
      }
    })
  }

}
