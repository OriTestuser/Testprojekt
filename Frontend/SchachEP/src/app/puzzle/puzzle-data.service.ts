import { Injectable } from '@angular/core';
import {BoardService} from "../game/board.service";
import {ChesspuzzleServiceService} from "../Service/chesspuzzle-service.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PuzzleDataService {
  public puzzleListForSend: string[][]=[];
  public csvData: string = '';
  public columnNames: string[] = [];
  public playPuzzleData :string[] = [];

  public boardData :string[][] = [];
  public restMoves :string = '';
  //abcd =>[b-1][a-1] move to[d-1][c-1]
  public restMoves1 :number[][][] = [];//players need to do.
  public restMoves2 :number[][][] = [];//opponent (bot) will do

  myTurn :boolean = false;
  constructor(private  boardService: BoardService,
              public chesspuzzleServiceService: ChesspuzzleServiceService,
              private router: Router,) { }

  analysisCSV(csvString: string) {
    const lines = csvString.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      //The trim() is used to remove whitespace characters at both ends of a string.

      if (line !== '') {
        //Check whether the string line is an empty string.

        const values = line.split(',');

        if (i === 0) {
          // If it's the first line, store it in columnNames
          this.columnNames = values;
        } else {
          this.puzzleListForSend.push(values);
        }
      }
    }

    console.log('Column Names:', this.columnNames);
    console.log('CSV data as list:', this.puzzleListForSend);
  }
  fenToBoard(fen :string){
    this.boardData = this.boardService.fenToBoard(fen);
    // if(this.boardService.turnData == 'w'){
    //   this.swapRows(0,7);
    //   this.swapRows(1,6);
    //   this.swapRows(2,5);
    //   this.swapRows(3,4);
    // }
    return this.boardData;
  }
  initializeRestMove(){
    //Remove all spaces
    this.restMoves = this.playPuzzleData[2].replace(/\s/g, '');
    this.restMoves = this.restMoves.replace(/a/g, '8');
    this.restMoves = this.restMoves.replace(/b/g, '7');
    this.restMoves = this.restMoves.replace(/c/g, '6');
    this.restMoves = this.restMoves.replace(/d/g, '5');
    this.restMoves = this.restMoves.replace(/e/g, '4');
    this.restMoves = this.restMoves.replace(/f/g, '3');
    this.restMoves = this.restMoves.replace(/g/g, '2');
    this.restMoves = this.restMoves.replace(/h/g, '1');
    console.log('initialize RestMove :',this.restMoves);

    for(let i = 0; i < this.restMoves.length / 8; i++) {

      this.restMoves1[i] = [];
      this.restMoves2[i] = [];

      for (let j = 0; j < 2; j++) {
        this.restMoves1[i][j] = [];
        this.restMoves2[i][j] = [];

        for (let k = 0; k < 2; k++) {
          this.restMoves1[i][j][k] = 0;
          this.restMoves2[i][j][k] = 0;
        }
      }
    }

    console.log(this.restMoves1, this.restMoves2);

    for (let i = 0; i < this.restMoves.length; i++) {
      const char = this.restMoves[i];

      // Change characters to numbers
      const digit = parseInt(char, 10);
      //console.log('i = ', i, 'char = ',char, 'digit = ', digit);

      const j = ((i - (i % 8)) / 8);
      const k = i % 4 >= 2 ? 1 : 0;
      const l = (i + 1) % 2;

      if ((i % 8) <= 3){
        //console.log('restMoves2[', j,'][', k, '][', l, '] = ', 8 - digit);
        this.restMoves2[j][k][l] = 8 - digit;
      }
      else{
        //console.log('restMoves1[', j,'][', k, '][', l, ']= ', 8 - digit);
        this.restMoves1[j][k][l] = 8 - digit;
      }
    }

    console.log('restMoves2:', this.restMoves2);
    console.log('restMoves1:', this.restMoves1);
  }
  swapRows(row1: number, row2: number): void {
    const temp = this.boardData[row1];
    this.boardData[row1] = this.boardData[row2];
    this.boardData[row2] = temp;
  }
  movePiece(begin: number[], target: number[]){
    this.boardData[target[0]][target[1]] = this.boardData[begin[0]][begin[1]];
    this.boardData[begin[0]][begin[1]] = 'Space';
  }

  solve(){
    this.chesspuzzleServiceService.solve(this.playPuzzleData[0], this.playPuzzleData[2].substring(5, 9)).subscribe(
      (response) =>{
        console.log('slove : ', response)
        this.myTurn = false;
        alert('Puzzle Sloved');
        this.router.navigate(['/puzzle']);
      },
    (error) =>{
      alert("Fail to solve ChessPuzzle");
      // handling errors
      console.error('Ein Fehler ist aufgetreten:', error);
      this.myTurn = false;
      this.router.navigate(['/puzzle']);
    }
    );
  }

  checkCanSelect(i: number, j: number) {
    console.log('this.boardData[', i, '][', j, '] = ', this.boardData[i][j], 'this.boardService.turnData = ', this.boardService.turnData);
    return this.boardService.turnData == 'b' && this.boardData[i][j].includes('White') ||
      this.boardService.turnData == 'w' && this.boardData[i][j].includes('Black');
  }
}
