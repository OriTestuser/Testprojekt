import { Injectable } from '@angular/core';
import {Chess, Piece, Square, SQUARES} from 'chess.js'
import {BotGameStateService} from "./bot-game-state.service";
import {ChessBotServiceService} from "../Service/chess-bot-service.service";

@Injectable({
  providedIn: 'root'
})
export class BotGameBoardService {

  gameID: number|undefined;
  constructor(private stateService: BotGameStateService,
              private botGameService: ChessBotServiceService,) { }

  chess: Chess = new Chess(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');//default
  chessboard = this.chess.board();
  defaultFEN: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  typeData: string[][] = [];
  onSelect_X: number = -1;
  onSelect_Y: number = -1;
  moves: string[] = [];
  placeCanMove: boolean[][] = [];
  specialSquare: boolean[][] = [];
  timer: number = 0;

  remainingTime: number = this.timer;

  squareMap: Square[][] = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
  ];

  myColor: string = 'w';

  setTimer(timer:number){
    this.timer = timer;
  }
  setGameId(id: number){
    this.gameID = id;
  }

  getType(i: number, j:number){
    //console.log('Try to get type on :', i, j,' = ',this.typeData[i][j]);
    return this.typeData[i][j];
  }
  checkSelected(x: number, y: number){
    return this.onSelect_X === x && this.onSelect_Y === y;
  }
  checkSpicial(x: number, y: number) {
    //console.log('Try to check specialSquare [', x, '][', y, '] = ', this.specialSquare[x][y]);
    return this.specialSquare[x][y];
  }

  checkCanMove(x: number, y: number){
    //console.log('Try to check placeCanMove [', x, '][', y, '] = ', this.placeCanMove[x][y]);
    return this.placeCanMove[x][y];
  }

  resetAll(){
    console.log('Start Reset ALL Board Data……');
    for(let i = 0; i <= 7; i++)
    {
      this.typeData[i] = [];
      this.placeCanMove[i] = [];
      this.specialSquare[i] = [];
      for(let j = 0; j <= 7; j++){
        this.typeData[i][j] = '';
        this.placeCanMove[i][j] = false;
        this.specialSquare[i][j] = false;
      }
    }
    this.onSelect_X = -1;
    this.onSelect_Y = -1;
    this.fenToBoard(this.chess.fen());
    this.stateService.resetPiece();
    console.log('End of data reset!');
  }

  resetCanMove(){
    console.log('Start Reset Place Can Move……');
    for(let i = 0; i <= 7; i++)
    {
      this.placeCanMove[i] = [];
      for(let j = 0; j <= 7; j++){
        this.placeCanMove[i][j] = false;
      }
    }
    this.stateService.resetPiece();
    console.log('End of data reset!');
  }
  setCanMove() {
    console.log('Start Set Can Move From: ', this.onSelect_X, this.onSelect_Y);
    const square = this.squareMap[this.onSelect_X][this.onSelect_Y];
    const moves = this.chess.moves({ square: square });
    console.log(this.chess,moves);
    for (let move of moves) {
      const targetSquare = move.substr(-2);
      const col = targetSquare[0];
      const row = targetSquare[1];

      const x = 8 - parseInt(row);
      const y = col.charCodeAt(0) - 'a'.charCodeAt(0);

      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        this.placeCanMove[x][y] = true;
        this.stateService.setChange(x, y);
      }
    }
  }
  resetSpecial(){
    console.log('Start Reset Special Square……');
    for(let i = 0; i <= 7; i++)
    {
      this.specialSquare[i] = [];
      for(let j = 0; j <= 7; j++){
        this.specialSquare[i][j] = false;
      }
    }
    this.stateService.resetPiece();
    console.log('End of data reset!');
  }

  resetOnSelect(){
    console.log('Start Reset On Select……');
    this.stateService.setChange(this.onSelect_X,this.onSelect_Y)
    this.onSelect_X = -1;
    this.onSelect_Y = -1;
    console.log('End of data reset!');
  }

  setOnSelect(x: number, y: number){
    console.log('Start Set ', x, y, 'On Select……');
    this.onSelect_X = x;
    this.onSelect_Y = y;
    this.stateService.setChange(x, y);
    console.log('End of data set!');
  }
  canSelect(x: number, y: number){
    const char = this.typeData[x][y];

    if(char === '0')
      return false;

    if (char === char.toUpperCase()) {
      return this.myColor == 'w';
    } else if (char === char.toLowerCase()) {
      return this.myColor == 'b';
    } else {
      return false;
    }
  }
  botMove(){
    if(this.gameID)
    this.botGameService.botMove(this.gameID).subscribe(
      (response) =>{
        console.log('FEN: ', response?.FEN);
        if(response?.FEN){
          console.log('/getFEN return from backend',);
          this.chess.load(response?.FEN);
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
  moveToStr(row: number, col: number){
    return this.squareMap[this.onSelect_X][this.onSelect_Y].toString() + this.squareMap[row][col].toString();
  }
  fenToBoard(fen: string){
    const boardData: string[][] = [];

    const [pieces, turn, castling, enPassant, halfMoves, fullMoves] = fen.split(' ');
    // this.turnData = turn;
    // this.castlingData = castling;
    // this.enPassantData = enPassant;
    // this.halfMovesData = parseInt(halfMoves);
    // this.fullMovesData = parseInt(fullMoves);
    //parseInt() converts numeric characters to integer values

    const rows = pieces.split('/');

    for (const row of rows) {
      const rowData: string[] = [];
      for (let char of row) {
        if (!/^\d+$/.test(char)) {
          //char = this.fenToStr(char);
          rowData.push(char);
        } else {
          const emptySpaces = parseInt(char);
          for (let i = 0; i < emptySpaces; i++) {
            rowData.push('0');//space ->default
          }
        }
      }
      boardData.push(rowData);
    }
    this.typeData =  boardData;
  }
}
