import { Component } from '@angular/core';
import {LiveSeriveService} from "../Service/live-serive.service";
import {PlaychessgameServiceService} from "../Service/playchessgame-service.service";
import { BoardService } from "../game/board.service";
import {UserServiceService} from "../Service/user-service.service";
import{ChessGame} from "../Model/ChessGame";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {User} from "../Model/User";

@Component({
  selector: 'app-live-interface',
  templateUrl: './live-interface.component.html',
  styleUrls: ['./live-interface.component.css']
})
export class LiveInterfaceComponent {
  private chessGame: ChessGame;
  public boardFEN: string = '';
  public boardData: string[][][] = [];

  public turnData: string = 'w';//Indicates whose turn it is to move the piece

  public castlingData: string = '';
  public enPassantData: string = '';
  public halfMovesData: number = 0;
  public fullMovesData: number = 0;
public user1:User;
public user2:User
  fen:string='';
  timer: any;
  firstName1:string='';
  firstName2:string='';
  lastName1:string='';
  lastName2:string='';
  point1:number=0;
  point2:number=0;
  color1:string='w';
  color2:string='b';
constructor(private liveService: LiveSeriveService,
            private playChessGameService:PlaychessgameServiceService,
            private userService: UserServiceService,
            public chessGameService: ChessgameServiceService,
            private boardService:BoardService) {
  this.chessGame=new ChessGame();
  this.user1=new User();
  this.user2=new User();
}

ngOnInit(){

  this.getFen();
  this.getBoard()
  this.timer = setInterval(() => {
    this.getFen();
    this.setUserData();
  this.getBoard();
  }, 5000);

}
ngOnDestroy() {
    clearInterval(this.timer); // stop the timer
  }
getFen(){
  if(this.liveService.liveId){
    this.liveService.FEN(this.liveService.liveId).subscribe((response)=>{
      if(response[0]){
        this.boardService.setFEN(response[0]);
        this.boardFEN=response[0];
        console.log('fen:',response[0]);
      }
    },(error)=>{console.log(error)});
  }
}
  getBoard(){
    this.boardData[0] = this.fenToBoard(this.boardFEN);
    this.boardData[1] = [];
    for (let i = 0; i < 8; i++) {
      this.boardData[1][i] = [];
      for (let j = 0; j < 8; j++) {
        this.boardData[1][i][j] = 'false';
      }
    }
    console.log(this.boardData);
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
  getChessCellBackground(row: number, col: number): string {
    if ((row + col) % 2 === 0) {
      return '../../assets/chess-piece/BGI_White.png';
    } else {
      return '../../assets/chess-piece/BGI_Black.png';
    }
  }

  setUserData() {
    if (this.liveService.liveId) {
      this.liveService.getChessGameState(this.liveService.liveId).subscribe((response) => {
        this.chessGame = response;
        console.log("chessGame", this.chessGame);
        if (response.user1) {
          this.user1 = response.user1;
          if(this.user1.firstName){
            this.firstName1=this.user1.firstName;
          }if(this.user1.lastName){
            this.lastName1=this.user1.lastName;
          }if(this.user1.points){
            this.point1=this.user1.points;
          }
        }

        if (response.user2) {
          this.user2 = response.user2;
          if(this.user2.firstName){
            this.firstName2=this.user2.firstName;
          }if(this.user2.lastName){
            this.lastName2=this.user2.lastName;
          }if(this.user2.points){
            this.point2=this.user2.points;
          }
        }

      }, (error) => {
        console.log("error", error);
      })
    }
  }
}
