import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {PlaychessgameServiceService} from "../Service/playchessgame-service.service";
import {BoardService} from "./board.service";
import {RulesEngineService} from "./rules-engine.service";
import {GameStateService} from "./game-state.service";

@Injectable({
  providedIn: 'root'
})
export class MoveGeneratorService {
  legalMove: string[];
  legalMoveData: number[][][];

  constructor(private chessGameService: ChessgameServiceService,
              private router: Router,
              private playChessGameService: PlaychessgameServiceService,
              private boardService: BoardService,
              private rulesEngineService: RulesEngineService,
              private gameStateService: GameStateService,) {
    this.legalMove = [];
    this.legalMoveData = [];
  }
  creatMove(target: number[]){
    console.log('Creat a move from', this.rulesEngineService.selectPiecePosition, 'to', target);

    //console.log(this.boardService.chess.pgn());


    this.playChessGameService.makeMove(this.arrayToString(this.rulesEngineService.selectPiecePosition,target),
      this.boardService.strToFen(this.boardService.boardData[0][this.rulesEngineService.selectPiecePosition[0]][this.rulesEngineService.selectPiecePosition[0]])
    ).subscribe(
      (response) =>{
        console.log('/creatMove return from backend:', response);
      },
      (error) =>{
        console.error('Ein Fehler ist aufgetreten：', error);
        this.errorWithSubmit();
        // handling errors
      }
    )

    this.playChessGameService.sendSAN(this.boardService.moveSAN).subscribe(
      (response) =>{
        console.log('/send SAN successfully');
      },
    (error) =>{
      console.error('Ein Fehler ist aufgetreten：', error);
      this.errorWithSubmit();
      // handling errors
    }
    );
  }
  getLegalMove(){
    this.legalMove = [];

    // this.legalMove=['a2a3', 'a2a4', 'b2b3', 'b2b4', 'c2c3', 'c2c4', 'd2d3', 'd2d4', 'e2e3', 'e2e4', 'f2f3', 'f2f4', 'g2g3', 'g2g4', 'h2h3', 'h2h4', 'b1a3', 'b1c3', 'g1f3', 'g1h3'];
    //For test

    console.log('Reset legalMoveData');
    for (let i: number = 0; i <= 64; i++){
      // Set the array to an empty array
      this.legalMoveData[i] = [];
      this.legalMoveData[i][0] = [];
      this.legalMoveData[i][0][0] = 9;
      this.legalMoveData[i][0][1] = 9;
      this.legalMoveData[i][1] = [];
      this.legalMoveData[i][1][0] = 9;
      this.legalMoveData[i][1][1] = 9;
    }

    this.playChessGameService.legalMove().subscribe(
     (response) =>{
       console.log('/legalMove return from backend:',response);
       if(response[0] == '[]'){

         console.log('/legalMove is empty, CheckMate');
         this.gameStateService.setCheckMate();
       }else{
         this.successOnLegalMove(response);

       }
     },
    (error) =>{
      console.error('Ein Fehler ist aufgetreten：', error);
      this.errorWithSubmit();
      // handling errors
    }
   )

  }
  successOnLegalMove(response: string[]){
    console.log('LegalMove is not empty. LegalMove =');
    const matches = response[0].match(/\b\w\d\w\d\b/g);

    if (matches) {
      this.legalMove = matches;
    }
    console.log(this.legalMove);
    this.stringToArray();
    for (let i: number = 0; i < this.legalMove.length; i++){
      if(this.legalMoveData[i][0][0] == this.rulesEngineService.selectPiecePosition[0]&&
        this.legalMoveData[i][0][1] == this.rulesEngineService.selectPiecePosition[1]){
        this.boardService.boardData[2][this.legalMoveData[i][1][0]][this.legalMoveData[i][1][1]] = 'true';
        console.log('Set', this.legalMoveData[i][1], 'canMove = ',this.boardService.boardData[2][this.legalMoveData[i][1][0]][this.legalMoveData[i][1][1]]);
      }
    }
    console.log('boardData = ', this.boardService.boardData[2]);
  }
  errorWithSubmit(){
    alert("ERROR");
  }
  stringToArray(){
    let startRow: number;
    let startCol: number;
    let targetRow: number;
    let targetCol: number;
    for (let i: number = 0; i < this.legalMove.length; i++){
      startRow = 8 - parseInt(this.legalMove[i].charAt(1));
      startCol = this.legalMove[i].charCodeAt(0) - 'a'.charCodeAt(0);
      targetRow = 8 - parseInt(this.legalMove[i].charAt(3));
      targetCol = this.legalMove[i].charCodeAt(2) - 'a'.charCodeAt(0);
      //'a'.charCodeAt(0) Make sure I get the encoded value of the character 'a' and not the string "a"
      // console.log('push',[
      //   [startRow, startCol],
      //   [targetRow, targetCol]
      // ]);
      this.legalMoveData[i][0]=[startRow, startCol];
      this.legalMoveData[i][1]=[targetRow, targetCol];
    }

  }
  arrayToString(start: number[], target: number[]){
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const startPosition = columns[start[1]] + (8 - start[0]);
    const targetPosition = columns[target[1]] + (8 - target[0]);

    //console.log(this.boardService.chess.move({ from: startPosition, to: targetPosition }));
    this.boardService.moveSAN = this.boardService.chess.move({ from: startPosition, to: targetPosition }).san;

    console.log(startPosition, 'to',targetPosition, 'SAN = ', this.boardService.moveSAN);
    return `${startPosition}${targetPosition}`;
}
}
