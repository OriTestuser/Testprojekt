import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ChessBotServiceService} from "../Service/chess-bot-service.service";
import {BotGameBoardService} from "../bot-game/bot-game-board.service";

@Component({
  selector: 'app-bot-game-setting',
  templateUrl: './bot-game-setting.component.html',
  styleUrls: ['./bot-game-setting.component.css']
})
export class BotGameSettingComponent {
  chessGameName: string;
  level: number;
  timer: number;
  constructor(private router: Router,
              private botGameService: ChessBotServiceService,
              private botBoard: BotGameBoardService){
    this.chessGameName = '';
    this.level = -1;
    this.timer = 0;
  }

  onSubmit(){
    console.log('Try creating a chess game with level ', this.level, 'named ', this.chessGameName, '.');

    this.botGameService.createGameWithBot(this.chessGameName, this.level, this.timer).subscribe(
      (response) =>{
        console.log(response);
        alert('Spieleinstellungen erfolgreich gespeichert.');
        this.botBoard.setGameId(response);
        this.botBoard.setTimer(this.timer);
        this.router.navigate(['/botGame']);
      },
    );

    // this.botBoard.gameID = 1;
    // this.router.navigate(['/botGame']);
    //For test
  }
  canStart(): boolean {
    return this.chessGameName.trim().length > 0 && this.level > 0&& this.timer > 0;
  }
}
