import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ChessgameServiceService} from "./chessgame-service.service";
import {UserServiceService} from "./user-service.service";
import {ChessBot} from "../Model/ChessBot";

@Injectable({
  providedIn: 'root'
})
export class ChessBotServiceService {
  private ChessBotServiceURL :string;

  constructor(private http: HttpClient ,
              private chessGameService: ChessgameServiceService,
              private userService: UserServiceService) {
    this.ChessBotServiceURL = 'http://localhost:8080/chessBot'
  }

  createGameWithBot(gameName: string, gameLevel: number, timer: number){
    const params =new HttpParams()
      .set( 'userId', this.userService.UserData.id + '')
      .set( 'gameName', gameName)
      .set( 'gameLevel', gameLevel)
      .set( 'timer', timer);
    console.log('Try to Chess Bot Game: ',params);
    return this.http.post<any>(this.ChessBotServiceURL + '/createGameWithBot', params);
    //http://localhost:8080/chessBot/createGameWithBot
  }

  makeMove(chessBotId: number, move: string){
    const params = new HttpParams()
      .set('chessBotId',chessBotId)
      .set('moveUser',move);
    console.log('Try to make move: ',params);
    return this.http.put<Boolean>(this.ChessBotServiceURL + "/makeMove", params);
    //http://localhost:8080/chessBot/makeMove
  }

  botMove(chessBotId: number){
    const params = new HttpParams()
      .set('chessBotId',chessBotId);
    console.log('Try to make the bot move: ',params);
    return this.http.put<any>(this.ChessBotServiceURL + "/botMove", params);
    //http://localhost:8080/chessBot/botMove
  }

  assistant(chessBotId: number){
    const params =new HttpParams()
      .set( 'chessBotId', chessBotId)
      .set( 'userId', this.userService.UserData.id + '');
    console.log('Try getting help from an assistant bot: ',params);
    return this.http.put<any>(this.ChessBotServiceURL + '/getBestMoveGameWithBot', params);
    //http://localhost:8080/chessBot/getBestMoveGameWithBot
  }

  leaveGame(chessBotId: number){
    const params = new HttpParams()
      .set('chessBotId',chessBotId);
    console.log('Try to leave game: ',params);
    return this.http.put<any>(this.ChessBotServiceURL + "/leaveGame", params);
    //http://localhost:8080/chessBot/leaveGame
  }
  sendSAN(chessBotId: number,SAN: string){
    const params =new HttpParams()
      .set( 'chessBotId', chessBotId)
      .set( 'SEN', SAN);
    console.log('Try to send SAN code to server: ',params);
    return this.http.post<any>(this.ChessBotServiceURL + '/SEN', params);
    //http://localhost:8080/chessBot/SEN
  }
  chessBotGames(){
    const params = new HttpParams()
      .set('userId', this.userService.UserData.id + '');
    console.log('Get Chess Bot Games');
    return this.http.get<ChessBot[]>(this.ChessBotServiceURL + '/chessBotGames', {params : params});
    //http://localhost:8080/chessBot/chessBotGames
  }
  rejoinGame(chessBotId: number){
    const params = new HttpParams()
      .set('chessBotId', chessBotId);
    console.log('rejoinGame: ',params);
    return this.http.put<any>(this.ChessBotServiceURL + '/rejoinGame', params);
  }
  //http://localhost:8080/chessBot/rejoinGame
  updateTimer(timer: number, chessBotId: number){
    const params = new HttpParams()
      .set('timer', timer)
      .set('chessBotId', chessBotId);
    console.log('Send Timer: ',params);
    return this.http.put<any>(this.ChessBotServiceURL + '/updateTimer', params);
  }
  //http://localhost:8080/chessBot/updateTimer
  endIfTimerExpired(chessBotId: number){
    const params = new HttpParams()
      .set('chessBotId', chessBotId);
    console.log('endIfTimerExpired: ',params);
    return this.http.put<any>(this.ChessBotServiceURL + '/endIfTimerExpired', params);
  }
  //http://localhost:8080/chessBot/endIfTimerExpired
}
