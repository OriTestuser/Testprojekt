import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../Model/User";
import { ChessGame } from '../Model/ChessGame'
import { UserServiceService } from "../Service/user-service.service";
import { FriendsServiceService } from "../Service/friends-service.service";
import { ChessgameServiceService } from "../Service/chessgame-service.service";
@Component({
  selector: 'app-open-matches',
  templateUrl: './open-matches.component.html',
  styleUrls: ['./open-matches.component.css']
})
export class OpenMatchesComponent {
  gameList: ChessGame[] = [];
  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              public chessGameService:ChessgameServiceService) {
  }

  ngOnInit(){
    this.gameList = [];
    if(this.userService.UserData.id != undefined){
      this.chessGameService.getExistingGames(this.userService.UserData.id).subscribe(
        (response) =>{
          if(response){
            this.gameList = response;
            this.successOnGetExistingGames();
          }
          else {
            this.leerGetExistingGames();
          }
          console.log(response);
        },
        (error) =>{
          // handling errors
          this.errorOnGetExistingGames();
          console.error('Ein Fehler ist aufgetreten：', error);
        }
      );
    }
    else {
      this.cantFindUser();
    }
  }
  joinGame(game : ChessGame){
    this.chessGameService.GameSetting = game;
    // if(this.userService.UserData.id != undefined){
      this.chessGameService.joinGame(this.chessGameService.GameSetting.chessGameId).subscribe(
          (response) =>{
            if(response){
              this.gotoGame();
            }
            else {
              this.cantJoinGame();
            }
          },
          (error) =>{
            // handling errors
            this.errorOnJoinGame();
            console.error('Ein Fehler ist aufgetreten：', error);
          }
      )
    // }


  }

  gotoGame(){
    console.log('Now going to the game.');
    this.router.navigate(['/game']);
    // this.router.navigate(['/onlineGame']);//Use the new version of the game
  }

  cantJoinGame(){
    console.log('cantJoinGame');
  }

  errorOnJoinGame(){
    console.log('errorOnJoinGame');
  }
  successOnGetExistingGames(){
    console.log('successOnGetExistingGames');
  }
  leerGetExistingGames(){
    console.log('leerGetExistingGames');
  }
  errorOnGetExistingGames(){
    console.log('errorOnGetExistingGames');
  }
  cantFindUser(){
    //When the currently logged in user cannot be found.
    console.log('Login user data is lost.');
    alert("Fehler: Bitte melden Sie sich erneut an.");
    this.router.navigate(['/login']);
  }
}
