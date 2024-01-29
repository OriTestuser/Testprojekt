import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {ChessGame} from '../Model/ChessGame'
import {UserServiceService} from "../Service/user-service.service";
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
@Component({
  selector: 'app-game-setting',
  templateUrl: './game-setting.component.html',
  styleUrls: ['./game-setting.component.css']
})
export class GameSettingComponent {

  chessGameName: string;
  timer: number;

  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService) {
    //Set default value
    this.chessGameName = this.chessGameService.GameSetting.chessGameName +'';
    this.timer = this.chessGameService.GameSetting.timer as number;
  }

  onSubmit(){
    //Save new settings to chessGameService.
    this.chessGameService.GameSetting.chessGameName = this.chessGameName;
    this.chessGameService.GameSetting.timer = this.timer;
    this.createChessGame();
  }

  canStart(): boolean {
    //Check if the game invitation was accepted.
    // return !!this.chessGameService.GameSetting.accepted;
    return true;
  }

  createChessGame(){
    console.log('Chess Game Name changed to: ', this.chessGameName, '\nTimer changes to: ', this.timer);
    if(this.chessGameService.GameSetting.user1?.id != undefined && this.chessGameService.GameSetting.user2?.id != undefined
    // &&this.chessGameService.GameSetting.chessGameName == undefined && this.chessGameService.GameSetting.timer == undefined
    ){
      this.chessGameService.createChessGame(this.chessGameName,
        this.timer,
        this.chessGameService.GameSetting.chessGameId).subscribe(
        (response) =>{
          console.log(response);
          alert('Spieleinstellungen erfolgreich gespeichert.');
          this.router.navigate(['/game']);
        },
        (error) => {
          // handling errors
          console.error('Ein Fehler ist aufgetreten：', error);}
      );
    }
      else{
        this.cantFindUser();
    }
  }
  cantFindUser(){
    //When the currently logged in user cannot be found.
    console.log('Login user data is lost.');
    alert("Fehler: Bitte melden Sie sich erneut an.");
  }
}
