import { Component } from '@angular/core';
import {UserServiceService} from "../Service/user-service.service";
import {Router} from "@angular/router";
import {User} from '../Model/User'
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {ChatServiceService} from "../Service/chat-service.service";
import {ChessClub} from "../Model/ChessClub";
import {ClubServiceService} from "../Service/club-service.service";
@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.component.html',
  styleUrls: ['./new-club.component.css']
})
export class NewClubComponent {
  clubName:string='';
  userId=this.userService.UserData.id;
  constructor(private router: Router,
              public userService: UserServiceService,
              private friendsService:FriendsServiceService,
  public clubService:ClubServiceService) {
  }
  createClub(){
    console.log(this.clubName);
    if(this.userId){
  this.clubService.create(this.clubName,this.userId).subscribe(
    (response)=>{
      this.clubService.CurrentClubData=response;
      alert("Success to create a club")
    },
      (error)=>{
      alert("Error to create club");
      })
  }
  }
}
