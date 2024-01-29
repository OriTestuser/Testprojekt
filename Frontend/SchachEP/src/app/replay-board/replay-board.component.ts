import { Component } from '@angular/core';
import {PlaychessgameServiceService} from "../Service/playchessgame-service.service";
import {Chess} from "chess.js";
import {ReplayServiceService} from "../Service/replay-service.service";

@Component({
  selector: 'app-replay-board',
  templateUrl: './replay-board.component.html',
  styleUrls: ['./replay-board.component.css']
})
export class ReplayBoardComponent {
  private boardFEN:string="";
  public boardData: string[][][] = [];
  public Name1:string="";
  public Name2:string="";
  points1:string='';
  points2:string='';


  public turnData: string = 'w';//Indicates whose turn it is to move the piece

  public castlingData: string = '';
  public enPassantData: string = '';
  public halfMovesData: number = 0;
  public fullMovesData: number = 0;
  constructor(private playChessGameService: PlaychessgameServiceService,
              public replayService:ReplayServiceService){}

  fenList: string[] = [];
  moves:any[]=[];
  step:number=0;
  maxStep:number=0;

  ngOnInit() {
    this.parsePGN();
    this.setMaxStep();
    this.setFEN(this.fenList[0]);
    this.getBoard();
    this.Name1=this.replayService.getPlayer1Name(this.replayService.pgn);
    this.Name2=this.replayService.getPlayer2Name(this.replayService.pgn);
    this.points1=this.replayService.getPlayer1Points(this.replayService.pgn);
    this.points2=this.replayService.getPlayer2Points(this.replayService.pgn);//get userData
  }

  getChessCellBackground(row: number, col: number): string {
    if ((row + col) % 2 === 0) {
      return '../../assets/chess-piece/BGI_White.png';
    } else {
      return '../../assets/chess-piece/BGI_Black.png';
    }
  }

  parsePGN() {
    this.fenList = [];
    const chess = new Chess();
    chess.loadPgn(this.replayService.pgn);

// get all moves
    this.moves = chess.history();
    console.log(this.moves);
    console.log(chess.fen());


//clone a board
    const clonedChess = new Chess();
    this.fenList.push(clonedChess.fen());
    for (const move of this.moves) {
      clonedChess.load(clonedChess.fen());  //
      clonedChess.move(move);
      this.fenList.push(clonedChess.fen());
    }
    console.log(this.fenList);
  }
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
  nextStep(){
  if(this.fenList[this.step+1]){//if this is the last step, then it doesnt have next step
    this.setFEN(this.fenList[this.step+1]);
    this.getBoard();
    this.step=this.step+1;
  }
  }
prevStep(){
  if(this.fenList[this.step-1]){//if this is the first step, then it doesnt have the prevstep
    this.setFEN(this.fenList[this.step-1]);
    this.getBoard();
    this.step=this.step-1;
  }
}
setMaxStep(){//set the maximum steps
  this.maxStep=this.fenList.length;
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
  getResult(){//match the data like [Result "1-0"] and get the winner
    const result = this.replayService.getGameResult(this.replayService.pgn);
    if(result=="1-0"){
return "White win";
    }else if (result=="0-1"){
      return "Black win"
    }else{
      return "Draw";
    }
  }



}
