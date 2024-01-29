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
  selector: 'app-all-clubs',
  templateUrl: './all-clubs.component.html',
  styleUrls: ['./all-clubs.component.css']
})
export class AllClubsComponent {
  clubs:ChessClub[]|undefined;
  constructor(private router: Router,
              public userService: UserServiceService,
              private friendsService:FriendsServiceService,
              public clubService:ClubServiceService) {
  }
  ngOnInit(){
    this.clubService.showChessClubs().subscribe((response)=>{
      this.clubService.allClubs=response;
      console.log("clubs",response);
    })
    console.log(this.clubService.allClubs)

  }
  joinClub(club:ChessClub){
    if(club.chessClubName&&this.userService.UserData.id){
  this.clubService.joinChessClub(club.chessClubName,this.userService.UserData.id).subscribe((response)=>
  {
    alert("Success to join Club");
  },(error)=>{
    if(error.status === 409){
      alert("you have joined the club")
    }else{
    alert("Error")}
  })
  }}
}
