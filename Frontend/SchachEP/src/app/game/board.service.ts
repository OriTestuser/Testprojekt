import { Injectable } from '@angular/core';
import {PlaychessgameServiceService} from "../Service/playchessgame-service.service";
import { Chess } from 'chess.js'

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public chess = new Chess();
  public moveSAN: string = '';

  public boardFEN: string = '';
  // public boardFEN: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  public boardData: string[][][] = [];

  public turnData: string = 'w';//Indicates whose turn it is to move the piece
  public myColor: string = '';//Store the color of the chess piece I hold

  public castlingData: string = '';
  public enPassantData: string = '';
  public halfMovesData: number = 0;
  public fullMovesData: number = 0;
  constructor(private playChessGameService: PlaychessgameServiceService,){}
  getBoard(){
    this.boardData[0] = this.fenToBoard(this.boardFEN);
    this.boardData[1] = [];
    this.boardData[2] = [];
    for (let i = 0; i < 8; i++) {
      this.boardData[1][i] = [];
      this.boardData[2][i] = [];
      for (let j = 0; j < 8; j++) {
        this.boardData[1][i][j] = 'false';
        this.boardData[2][i][j] = 'false';
      }
    }
    console.log(this.boardData);
  }
  setFEN(newFEN:string){
    this.boardFEN = newFEN;
  }
  fenToBoard(fen: string): string[][] {
    const boardData: string[][] = [];

    const [pieces, turn, castling, enPassant, halfMoves, fullMoves] = fen.split(' ');
    this.turnData = turn;
    this.castlingData = castling;
    this.enPassantData = enPassant;
    this.halfMovesData = parseInt(halfMoves);
    this.fullMovesData = parseInt(fullMoves);
    //parseInt() converts numeric characters to integer values

    const rows = pieces.split('/');

    for (const row of rows) {
      const rowData: string[] = [];
      for (let char of row) {
        if (!/^\d+$/.test(char)) {
          char = this.fenToStr(char);
          rowData.push(char);
        } else {
          const emptySpaces = parseInt(char);
          for (let i = 0; i < emptySpaces; i++) {
            rowData.push('Space');
          }
        }
      }
      boardData.push(rowData);
    }
    return boardData;
  }

  setAllisSelectedFalse(){
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.boardData[1][i][j] = 'false';
      }
    }
  }
  setAllCanMoveFalse(){
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.boardData[2][i][j] = 'false';
      }
    }
  }
  fenToStr(fen:string): string{
    switch (fen) {
      case 'K':
        return 'White_King';
      case 'k':
        return 'Black_King';
      case 'Q':
        return 'White_Queen';
      case 'q':
        return 'Black_Queen';
      case 'B':
        return 'White_Bishop';
      case 'b':
        return 'Black_Bishop';
      case 'N':
        return 'White_kNight';
      case 'n':
        return 'Black_kNight';
      case 'R':
        return 'White_Rook';
      case 'r':
        return 'Black_Rook';
      case 'P':
        return 'White_Pawn';
      case 'p':
        return 'Black_Pawn';
      default:
        return 'Space';
    }
  }

  strToFen(str:string): string{
    switch (str) {
      case 'White_King':
        return 'K';
      case 'Black_King':
        return 'k';
      case 'White_Queen':
        return 'Q';
      case 'Black_Queen':
        return 'q';
      case 'White_Bishop':
        return 'B';
      case 'Black_Bishop':
        return 'b';
      case 'White_kNight':
        return 'N';
      case 'Black_kNight':
        return 'n';
      case 'White_Rook':
        return 'R';
      case 'Black_Rook':
        return 'r';
      case 'White_Pawn':
        return 'P';
      case 'Black_Pawn':
        return 'p';
      default:
        return '';
    }
  }
}



