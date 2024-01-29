import { Injectable } from '@angular/core';
import {BoardService} from "./board.service";
import {PlaychessgameServiceService} from "../Service/playchessgame-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  public gameState: string = '';
  public lastGameState: string = '';
  //'Game Start' | 'Your Turn' | 'Opponent Turn' | 'Check Mate' | 'Draw'
  constructor(private router: Router,
              private boardService: BoardService,
              private playChessGameServiceService: PlaychessgameServiceService,
              private chessGameServiceService: ChessgameServiceService) { }
  setGameState(){
    this.lastGameState = this.gameState;
    this.gameState = 'Game Start';
    if(this.boardService.myColor == this.boardService.turnData){
      this.gameState = 'Your Turn';
    } else{
      this.gameState = 'Opponent Turn';
    }
  }
  setCheckMate(){
    if(this.chessGameServiceService.GameSetting.user2?.id&&this.chessGameServiceService.GameSetting.user1?.id){
      this.playChessGameServiceService.checkMate(this.chessGameServiceService.GameSetting.user2?.id, this.chessGameServiceService.GameSetting.user1?.id).subscribe(
        (response) =>{
          console.log('Check /checkMate from backend:', response);
          if(response){
            this.gameState = 'Check Mate';
            return true;
          }
          return false;
        },
        (error) => {
          console.error('Ein Fehler ist aufgetreten：', error);
          this.errorWithSubmit();
          // handling errors
        }
      );
    }
  }
  testDraw(){
    console.log('TEST DRAW');
    this.playChessGameServiceService.draw().subscribe(
      (response) =>{
        console.log('Check /draw from backend:', response);
        if(response){
          this.gameState = 'Draw';
          return true;
        }
        return false;
      },
      (error) => {
        console.error('Ein Fehler ist aufgetreten：', error);
        this.errorWithSubmit();
        // handling errors
      }
    );
  }

  testGameEnd(){
    console.log('TEST GAME END');
    this.playChessGameServiceService.isFinish().subscribe(
      (response) =>{
        if(response){
          console.log('Game End');
          alert("Spiel vorbei");
          this.router.navigate(['openMatches']);
        }
        if(this.gameState == 'Surrender')
          this.router.navigate(['openMatches']);
      },
      (error) =>{
        console.error('Ein Fehler ist aufgetreten：', error);
        this.errorWithSubmit();
        // handling errors
      },
    );

  }
  isMyTurn(){
    return this.gameState == 'Your Turn';
  }
  errorWithSubmit(){
    alert("ERROR");
  }

  turnChange(){
    return !(this.lastGameState == this.gameState);
  }
}
