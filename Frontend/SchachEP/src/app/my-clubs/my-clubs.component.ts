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
  selector: 'app-my-clubs',
  templateUrl: './my-clubs.component.html',
  styleUrls: ['./my-clubs.component.css']
})
export class MyClubsComponent {
  clubs: ChessClub[] | undefined;

  constructor(private router: Router,
              public userService: UserServiceService,
              private friendsService: FriendsServiceService,
              private chessGameService: ChessgameServiceService,
              public chatService: ChatServiceService,
              public clubService:ClubServiceService) {
  }

  ngOnInit() {
    if (this.userService.UserData.id) {
      this.userService.getChessClubs(this.userService.UserData.id).subscribe(
          (response) => {
            this.clubs = response;
          })
    }
  }
selectClub(club:ChessClub){
  this.clubService.CurrentClubData =club;
  if(this.userService.UserData.id&&club.chessClubName){
  this.chatService.openChessClubChat(this.userService.UserData.id,club.chessClubName)
    .subscribe((response)=>{
      this.chatService.chatInClub=response;
      console.log("response",response);
      console.log("Name",this.chatService.chatInClub.chatName);
    }
  )}

}
}
