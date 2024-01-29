import { Injectable } from '@angular/core';
import  {  Chess  }  from  'chess.js'
import {PlaychessgameServiceService} from "../Service/playchessgame-service.service";
import {OnlineGameStateService} from "./online-game-state.service";

@Injectable({
  providedIn: 'root'
})
export class OnlineGameBoardService {
  constructor(private playChessGameService: PlaychessgameServiceService,
              private stateService: OnlineGameStateService,
  ) { }

  chess: Chess = new Chess();
  lastFEN: string = '';

  pieceType: string[][] = [];
  onSelect_X: number = -1;
  onSelect_Y: number = -1;
  placeCanMove: boolean[][] = [];

  myColor: string = 'w';

  getType(x: number, y: number){
    console.log('Try to get type on [', x, '][', y, '] = ', this.pieceType[x][y]);
    return this.pieceType[x][y];
  }
  checkSelected(x: number, y: number){
    return this.onSelect_X === x || this.onSelect_Y === y;
  }

  checkCanMove(x: number, y: number){
    console.log('Try to check placeCanMove [', x, '][', y, '] = ', this.placeCanMove[x][y]);
    return this.placeCanMove[x][y];
  }

  reset(){
    console.log('Start reset board data……');
    for(let i = 0; i <= 7; i++)
    {
      this.pieceType[i] = [];
      this.placeCanMove[i] = [];
      for(let j = 0; j <= 7; j++){
        this.pieceType[i][j] = '';
        this.placeCanMove[i][j] = false;
      }
    }
    this.onSelect_X = -1;
    this.onSelect_Y = -1;
    console.log('End of data reset!');
  }

  getFEN(){
    this.playChessGameService.FEN().subscribe(
      (response) =>{
        console.log('FEN: ', response[0]);
        if(response[0]){
          console.log('/getFEN return from backend',);
          this.chess.load(response[0]);
          //Store the returned FEN code in ‘chess’
        }
        else{
          console.log('FEN is leer');
        }
      },
      (error) =>{
        console.error('Ein Fehler ist aufgetreten：', error);
        this.errorWithSubmit();
        // handling errors
      },
      () => {
        console.log('/getFEN Request completed.');  // This will be called when the request is completed, regardless of success or error.
        if(this.chess.turn() == this.myColor){
          this.stateService.setState(0);
          //Game State 42->0
        }
      }
    );
  }
  errorWithSubmit(){
    alert("ERROR");
  }
}
