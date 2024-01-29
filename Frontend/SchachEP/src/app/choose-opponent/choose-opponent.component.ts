import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {ChessGame} from "../Model/ChessGame";
import {UserServiceService} from "../Service/user-service.service";
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";

@Component({
  selector: 'app-choose-opponent',
  templateUrl: './choose-opponent.component.html',
  styleUrls: ['./choose-opponent.component.css']
})
export class ChooseOpponentComponent {
  opponentList: ChessGame[] = [];

  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService) {
  }

  ngOnInit(): void{
    if(this.userService.UserData.id != undefined){
      this.chessGameService.chooseOpponent(this.userService.UserData.id).subscribe(
        (response) =>{
          if(response){
            console.log(response);
            this.opponentList = response;
            this.successOnChooseOpponent();
          }
          else {
            this.leerChooseOpponent();
          }
          console.log(response);
        },
        (error) =>{
          // handling errors
          this.errorOnChooseOpponent();
          console.error('Ein Fehler ist aufgetreten：', error);
        }
      );
    }
    else {
      this.cantFindUser();
    }
  }

  successOnChooseOpponent(){}
  leerChooseOpponent(){}
  errorOnChooseOpponent(){}
  cantFindUser(){
    //When the currently logged in user cannot be found.
    console.log('Login user data is lost.');
    alert("Fehler: Bitte melden Sie sich erneut an.");
  }

  choose(opponent :ChessGame){
    // this.chessGameService.GameSetting.user1 = this.userService.UserData;
    // this.chessGameService.GameSetting.user2 = new User();
    //Choose your opponent.
    this.chessGameService.GameSetting = opponent;
    console.log('Opponent: ',opponent);
    //Navigate to game settings.
    this.router.navigate(['/gameSetting']);
  }

}
