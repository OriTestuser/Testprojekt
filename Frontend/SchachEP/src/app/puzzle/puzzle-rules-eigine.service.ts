import { Injectable } from '@angular/core';
import {PuzzleDataService} from "./puzzle-data.service";
import {BoardService} from "../game/board.service";

@Injectable({
  providedIn: 'root'
})
export class PuzzleRulesEigineService {
public isSelect :boolean = false;
public selectPosition :number[] =[];
public step :number = 0;
  constructor(public puzzleDataService: PuzzleDataService,
              public boardService: BoardService,) { }
  selectPiece(i: number,j :number){
    console.log('User select :[', i, '][', j, ']');
    if(this.isSelect){
      return this.checkMove(i, j);
    }
    else {
      if(this.puzzleDataService.checkCanSelect(i, j)){
        this.isSelect = true;
        this.selectPosition = [i, j];
        console.log('this.selectPosition = ', this.selectPosition, 'this.isSelect = ', this.isSelect);
      }
      return true;
    }
  }

  resetGame(){

    //
    this.puzzleDataService.initializeRestMove();
    this.puzzleDataService.boardData = this.boardService.fenToBoard(this.puzzleDataService.playPuzzleData[1]);
    this.step = 0;
    this.isSelect = false;
    this.selectPosition = [];
    this.puzzleDataService.myTurn = false;
    this.puzzleDataService.restMoves1 = [];
    this.puzzleDataService.restMoves2 = [];
    console.log('boardData: ', this.puzzleDataService.boardData);
  }

  private checkMove(i: number, j: number) {
    console.log('check move from ', this.selectPosition, ' to [', i, ',', j, ']');
    console.log('this.puzzleDataService.restMoves1[this.step][0] = ', this.puzzleDataService.restMoves1[this.step][0],
      'this.puzzleDataService.restMoves1[this.step][1][0] = ', this.puzzleDataService.restMoves1[this.step][1][0],
      'this.puzzleDataService.restMoves1[this.step][1][1] = ', this.puzzleDataService.restMoves1[this.step][1][1]);
    console.log(this.selectPosition[0] == this.puzzleDataService.restMoves1[this.step][0][0],
      this.selectPosition[1] == this.puzzleDataService.restMoves1[this.step][0][1],
      i == this.puzzleDataService.restMoves1[this.step][1][0],
      j == this.puzzleDataService.restMoves1[this.step][1][1]);
    if(this.selectPosition[0] == this.puzzleDataService.restMoves1[this.step][0][0] &&
      this.selectPosition[1] == this.puzzleDataService.restMoves1[this.step][0][1] &&
    i == this.puzzleDataService.restMoves1[this.step][1][0] &&
    j == this.puzzleDataService.restMoves1[this.step][1][1]){
      this.puzzleDataService.movePiece(
        this.puzzleDataService.restMoves1[this.step][0],
        this.puzzleDataService.restMoves1[this.step][1]);

      this.isSelect = false;
      this.selectPosition = [];
      this.step = this.step + 1;

      if(this.step >= this.puzzleDataService.restMoves1.length){
        this.puzzleDataService.solve();
        console.log('reset game');
        this.resetGame();
      } else{
        this.puzzleDataService.myTurn = false;
      }

      return true;
    }
    else return false;
  }

  botMove() {
    this.puzzleDataService.movePiece(
      this.puzzleDataService.restMoves2[this.step][0],
      this.puzzleDataService.restMoves2[this.step][1]);
    this.puzzleDataService.myTurn = true;
  }
}
