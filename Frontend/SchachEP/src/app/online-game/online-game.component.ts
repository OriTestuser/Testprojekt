import {ChangeDetectorRef, Component} from '@angular/core';
import { Router } from "@angular/router";
import { ChessgameServiceService } from "../Service/chessgame-service.service";
import { PlaychessgameServiceService} from "../Service/playchessgame-service.service";
import {OnlineGameStateService} from "./online-game-state.service";
import {OnlineGameBoardService} from "./online-game-board.service";
import {OnlineGamePieceComponent} from "../online-game-piece/online-game-piece.component";
import {UserServiceService} from "../Service/user-service.service";
import  {  Chess  }  from  'chess.js'

@Component({
  selector: 'app-online-game',
  templateUrl: './online-game.component.html',
  styleUrls: ['./online-game.component.css']
})
export class OnlineGameComponent {
  public gameState: string = 'Waiting for the opponent...';

  public colorStr: string = 'The color of your chess piece is ';
  //add 'white' or 'Black'

  public yourID: number = 0;
  public oppoID: number = 0;

  private intervalID: any;

  public User1FirstName: string = 'FirstName';
  public User1LastName: string = 'LastName';
  public User1Point: number = 999;
  public User1PieceColor: string = 'Unknown';

  public User2FirstName: string = 'FirstName';
  public User2LastName: string = 'LastName';
  public User2Point: number = 999;
  public User2PieceColor: string = 'Unknown';

  constructor(private router: Router,
              public chessGameService: ChessgameServiceService,
              private playChessGameService: PlaychessgameServiceService,
              private cdr: ChangeDetectorRef,
              private stateService: OnlineGameStateService,
              private boardService: OnlineGameBoardService,
              private userService: UserServiceService,
  ) {}
  ngOnInit(){
    this.setUserCard();
    this.boardService.reset();
    this.boardService.getFEN();

  }


  setUserCard(){
    if(this.userService.UserData.id){
      this.yourID = this.userService.UserData.id
    }
    if(this.chessGameService.GameSetting.user1?.id == this.userService.UserData.id
      && this.chessGameService.GameSetting.user2?.id){
      this.boardService.myColor = 'w';
      this.colorStr = this.colorStr + 'white';
      this.oppoID = this.chessGameService.GameSetting.user2?.id;
    }
    else{
      this.boardService.myColor = 'b';
      this.colorStr = this.colorStr + 'white';
      if(this.chessGameService.GameSetting.user1?.id)
      this.oppoID = this.chessGameService.GameSetting.user1?.id;
    }
  }
}
