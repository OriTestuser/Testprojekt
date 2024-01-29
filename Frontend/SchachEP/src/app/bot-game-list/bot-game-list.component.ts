import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ChessBotServiceService} from "../Service/chess-bot-service.service";
import {UserServiceService} from "../Service/user-service.service";
import {ChessBot} from "../Model/ChessBot";
import {BotGameBoardService} from "../bot-game/bot-game-board.service";


@Component({
  selector: 'app-bot-game-list',
  templateUrl: './bot-game-list.component.html',
  styleUrls: ['./bot-game-list.component.css']
})
export class BotGameListComponent {
  constructor(private router: Router,
              private chessBotService: ChessBotServiceService,
              private userService: UserServiceService,
              private botBoard: BotGameBoardService){

  }
  gameList: ChessBot[] = [];

  ngOnInit(){
    if(this.userService.UserData.id != undefined){
      this.chessBotService.chessBotGames().subscribe(
        (response) => {
          if(response){
            console.log('successOnGetChessBotGames: ', response);
            this.gameList = response;
          }
          else {
            console.log('leerGetChessBotGames');
          }
      },
        (error) =>{
          // handling errors
          alert("ERROR");
          console.error('Ein Fehler ist aufgetreten：', error);
        }
      );
    }
  }
  joinGame(game: ChessBot){
    console.log('Try creating a chess game with level ', game.level, 'named ', game.chessGameName, '.');

    if(game.chessBotId && game.timerUser && game.boardState){
      this.botBoard.defaultFEN = game.boardState;
      this.botBoard.setGameId(game.chessBotId);
      this.botBoard.setTimer(game.timerUser);
      this.chessBotService.rejoinGame(game.chessBotId).subscribe(
        (response) =>{
          console.log('rejoinGame: ', response);

          if(game.chessBotId && game.timerUser)
          this.chessBotService.updateTimer(game.timerUser, game.chessBotId).subscribe(
            (response) =>{
              console.log('updateTimer: ', response);
              this.router.navigate(['/botGame']);
            },
            (error) =>{
              // handling errors
              alert("ERROR");
              console.error('Ein Fehler ist aufgetreten：', error);
            }
          );

        },
        (error) =>{
          // handling errors
          alert("ERROR");
          console.error('Ein Fehler ist aufgetreten：', error);
        }
      );

    }

    //this.router.navigate(['/botGame']);
  }
}
