import { Component, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../Model/User";
import { ChessGame } from '../Model/ChessGame'
import { UserServiceService } from "../Service/user-service.service";
import { FriendsServiceService } from "../Service/friends-service.service";
import { ChessgameServiceService } from "../Service/chessgame-service.service";
import { PlaychessgameServiceService} from "../Service/playchessgame-service.service";
import { PieceComponent } from "../piece/piece.component";
import { BoardService } from "./board.service";
import { interval, Subscription } from 'rxjs';
import { MoveGeneratorService } from "./move-generator.service";
import {GameStateService} from "./game-state.service";
import {RulesEngineService} from "./rules-engine.service";
import {Chess} from "chess.js";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnDestroy{
  public board: string[][][] = [];
  private readonly refreshSubscription: Subscription;
  public gameState: string = 'Starting Game……';

  public streaming: boolean = false;

  public yourFirstName: string = '';
  public yourLastName: string = '';
  public yourPoint: number = 0;
  public yourColor: string = '';

  public oppoId: number = 0;

  public oppoFirstName: string = '';
  public oppoLastName: string = '';
  public oppoPoint: number = 0;
  public oppoColor: string = '';

  // public canGetAssistant: boolean = false;
  public assistantMessage:  string = 'Die Assistentennachricht ist hier';
  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService: FriendsServiceService,
              public chessGameService: ChessgameServiceService,
              private playChessGameService: PlaychessgameServiceService,
              private boardService: BoardService,
              private cdr: ChangeDetectorRef,
              private moveGeneratorService: MoveGeneratorService,
              private gameStateService: GameStateService,
              private rulesEngineService: RulesEngineService,
  ) {
    const refreshInterval = interval(2000);
    this.refreshSubscription = refreshInterval.subscribe(() => {
      this.refreshComponent();
    });
  }

  protected readonly ChessGame = ChessGame;

  ngOnInit() {
    this.gameStateService.testGameEnd();
    this.setMyColor();
    this.getFEN();
    this.boardService.getBoard();
    this.board =this.boardService.boardData;
    console.log(this.board);
    this.setUserData();
    // this.canGetAssistant = true;
    // this.moveGeneratorService.getLegalMove();
  }

  assistant(){
    // this.canGetAssistant = false;
    this.playChessGameService.assistant(this.boardService.boardFEN).subscribe(
      (response) => {
        console.log('Erfolgreich Hilfe erhalten: ', response);
        this.yourPoint = response?.newPointsOfUser;
        this.assistantMessage = response?.bestMove;
        if (this.assistantMessage.length === 4) {
          const startColumn = this.assistantMessage[0].charCodeAt(0) - 'a'.charCodeAt(0);
          const startRow = 8 - parseInt(this.assistantMessage[1], 10);

          const endColumn = this.assistantMessage[2].charCodeAt(0) - 'a'.charCodeAt(0);
          const endRow = 8 - parseInt(this.assistantMessage[3], 10);

          if (this.isWithinBounds(startRow, startColumn) && this.isWithinBounds(endRow, endColumn)) {
            this.rulesEngineService.selectPiecePosition[0] = startRow;
            this.rulesEngineService.selectPiecePosition[1] = startColumn;
            this.moveGeneratorService.legalMove.push(this.assistantMessage);
            //this.boardService.boardData[1][startRow][startColumn] = 'true';
            //this.boardService.boardData[2][endRow][endColumn] = 'true';
          }
        }      },
    (error) =>{
      // handling errors
      this.errorOnStopGame();
      // this.canGetAssistant= true;
      console.error('Ein Fehler ist aufgetreten：', error);
    }
    );
  }
  isWithinBounds(row: number, column: number): boolean {
    return row >= 0 && row < this.boardService.boardData[1].length &&
      column >= 0 && column < this.boardService.boardData[1][0].length;
  }
  getChessCellBackground(row: number, col: number): string {
    if ((row + col) % 2 === 0) {
      return '../../assets/chess-piece/BGI_White.png';
    } else {
      return '../../assets/chess-piece/BGI_Black.png';
    }
  }

  stopGame(){
    this.chessGameService.stopGame(this.chessGameService.GameSetting.chessGameId).subscribe(
      (response) =>{
        if(response){
          this.gotoOpenMatches();
        }
        else {
          this.cantStopGame();
        }
      },
      (error) =>{
        // handling errors
        this.errorOnStopGame();
        console.error('Ein Fehler ist aufgetreten：', error);
      }
    );
  }

  gotoOpenMatches(){
    console.log('gotoOpenMatches');
    this.router.navigate(['/openMatches']);
  }

  cantStopGame(){
    console.log('cantStopGame');
  }

  errorOnStopGame(){
    console.log('errorOnStopGame');
  }

  refreshComponent() {



    console.log('refresh');
    this.cdr.detectChanges();

    console.log('TEST LEGAL MOVE');
    this.moveGeneratorService.getLegalMove();

    console.log('TEST GET FEN');
    this.getFEN();
    this.boardService.getBoard();
    this.rulesEngineService.setSelect();

    this.getOppoPoint();

    console.log('TEST DRAW');
    this.gameStateService.testDraw();

    this.gameStateService.testGameEnd();

    this.gameStateService.setGameState();
    this.gameState = this.gameStateService.gameState;

    if(this.gameStateService.isMyTurn()){
    }

    this.board =this.boardService.boardData;
    console.log(this.board);
  }

  getOppoPoint(){
    let oppoId: number|undefined;
    if(this.chessGameService.GameSetting.user2 && this.chessGameService.GameSetting.user1)
    if(this.isMyColorWhite()){
      oppoId = this.chessGameService.GameSetting.user2.id;
      if(oppoId)this.oppoId = oppoId;
    }
    else{
      if(oppoId)this.oppoId = oppoId;
      oppoId = this.chessGameService.GameSetting.user1.id;
    }
    if(oppoId)
    this.userService.getUserProfile(oppoId).subscribe((response)=>{
     if(response.points)
      this.oppoPoint = response.points;
    },(error)=>{
      console.log("error",error);
    })
  }
  getFEN(){
    this.playChessGameService.FEN().subscribe(
      (response) =>{
        console.log('FEN: ', response[0]);

        this.boardService.chess = new Chess(response[0]);

        if(response[0]){
          console.log('/getFEN return from backend',);
          this.boardService.setFEN(response[0]);
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
        console.log('Request completed.');  // This will be called when the request is completed, regardless of success or error.
      }
    );
  }


  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
  errorWithSubmit(){
    alert("ERROR");
  }

  setMyColor(){
    if(this.chessGameService.GameSetting.user1?.id == this.userService.UserData.id){
      this.boardService.myColor = 'w';
    }
    else  this.boardService.myColor = 'b';
  }

  isMyColorWhite()
  {
    return this.boardService.myColor == 'w';
  }

  setUserData(){
    if(this.chessGameService.GameSetting.user1 && this.chessGameService.GameSetting.user2
      && this.chessGameService.GameSetting.user2.points && this.chessGameService.GameSetting.user1.points)
    if (this.isMyColorWhite()){
      this.oppoFirstName = this.chessGameService.GameSetting.user2.firstName + '';
      this.oppoLastName = this.chessGameService.GameSetting.user2.lastName + '';
      this.oppoPoint = this.chessGameService.GameSetting.user2.points;
      this.oppoColor = 'b';
      this.userService.UserData.points = this.chessGameService.GameSetting.user1.points;
    }
    else{
      this.oppoFirstName = this.chessGameService.GameSetting.user1.firstName + '';
      this.oppoLastName = this.chessGameService.GameSetting.user1.lastName + '';
      this.oppoPoint = this.chessGameService.GameSetting.user1.points;
      this.oppoColor = 'w';
      this.userService.UserData.points = this.chessGameService.GameSetting.user2.points
    }
    this.yourFirstName = this.userService.UserData.firstName + '';
    this.yourLastName = this.userService.UserData.lastName + '';
    if(this.userService.UserData.points)
    this.yourPoint = this.userService.UserData.points;
    this.yourColor = this.boardService.myColor;
  }
  surrenderGame(){
    if(this.userService.UserData.id){
      this.playChessGameService.surrender(this.oppoId,this.userService.UserData.id).subscribe(
        (response) =>{
          console.log('Check /surrender from backend:', response);
          if(response){
            this.gameStateService.gameState = 'Surrender';
            console.log('Game End');
            alert("Spiel vorbei");
            this.router.navigate(['openMatches']);
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

  startStreaming(){
    if(!this.streaming){
      this.streaming = true;
      this.playChessGameService.streaming().subscribe(
        (response) =>{
          console.log(response);
          if(response){
            alert("Start Streaming");
          }
        },
        (error) => {
          console.error('Ein Fehler ist aufgetreten：', error);
          this.errorWithSubmit();
          // handling errors
        }
      );
    }

  }
}
