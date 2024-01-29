import { Injectable } from '@angular/core';
import { ChessgameServiceService } from "./chessgame-service.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import { UserServiceService } from "./user-service.service";

@Injectable({
  providedIn: 'root'
})
export class PlaychessgameServiceService {
  private PlaychessgameServiceURL :string;
  private StreamingServiceURL :string;
  constructor(private http: HttpClient ,
              private chessGameService: ChessgameServiceService,
              private userService: UserServiceService) {
    this.PlaychessgameServiceURL = 'http://localhost:8080/PlayChessGame'
    this.StreamingServiceURL = 'http://localhost:8080/stream'
  }
  makeMove(move:string, piece:string){
    const ID = this.chessGameService.GameSetting.chessGameId;
    const params = new HttpParams()
      .set('move',move)
      //.set('piece', piece)
      .set('chessGameId',ID);
    console.log(params);
    return this.http.put<Boolean>(this.PlaychessgameServiceURL + "/makeMove", params);
    //http://localhost:8080/PlayChessGame/makeMove
  }

  legalMove(){
    const params= {chessGameId: this.chessGameService.GameSetting.chessGameId,};
    console.log(params);
    return this.http.get<string[]>(this.PlaychessgameServiceURL + "/legalMove" ,{params:params});
    //http://localhost:8080/PlayChessGame/legalMove
  }

  FEN(){
    const params= {chessGameId: this.chessGameService.GameSetting.chessGameId,};
    console.log('Get FEN', params);
    return this.http.get<string[]>(this.PlaychessgameServiceURL + "/FEN" ,{params:params});
    //http://localhost:8080/PlayChessGame/FEN
  }
  checkMate(winnerId: number, loserId: number){
    const params =new HttpParams()
      .set( 'chessGameId', this.chessGameService.GameSetting.chessGameId)
      .set( 'winnerId', winnerId)
      .set( 'loserId', loserId);
    return this.http.put<Boolean>(this.PlaychessgameServiceURL + "/checkMate", params);
    //http://localhost:8080/PlayChessGame/checkMate
  }
  surrender(winnerId: number, loserId: number){
    const params =new HttpParams()
      .set( 'chessGameId', this.chessGameService.GameSetting.chessGameId)
      .set( 'winnerId', winnerId)
      .set( 'loserId', loserId);
    console.log('surrender: ', params);
    return this.http.put<Boolean>(this.PlaychessgameServiceURL + "/surrender", params);
    //http://localhost:8080/PlayChessGame/surrender
  }

  draw(){
    const params= {chessGameId: this.chessGameService.GameSetting.chessGameId,};
    console.log(params);
    return this.http.get<Boolean>(this.PlaychessgameServiceURL + "/draw" ,{params:params});
    //http://localhost:8080/PlayChessGame/draw
  }

  getTimer(whiteOrBlack: string){
    const params= {chessGameId: this.chessGameService.GameSetting.chessGameId,
      whitheOrBlack: whiteOrBlack,};
    console.log(params);
    return this.http.get<Number>(this.PlaychessgameServiceURL + "/Timer" ,{params:params});
    //http://localhost:8080/PlayChessGame/Timer
  }

  isFinish(){
    const params = {chessGameId: this.chessGameService.GameSetting.chessGameId,}
    console.log('check the game is end or not by chessGameId: ',params);
    return this.http.get<Boolean>(this.PlaychessgameServiceURL + '/getFinished', {params:params});
    //http://localhost:8080/PlayChessGame/getFinished
  }

  assistant(FEN :string){
    const params =new HttpParams()
      .set( 'chessGameId', this.chessGameService.GameSetting.chessGameId)
      .set( 'boardStateFEN', FEN)
      .set( 'userId', this.userService.UserData.id + '');
    console.log('Try getting help from an assistant bot: ',params);
    return this.http.put<any>(this.PlaychessgameServiceURL + '/assistant', params);
    //http://localhost:8080/PlayChessGame/assistant
  }

  streaming(){
    const params =new HttpParams()
      .set( 'chessGameId', this.chessGameService.GameSetting.chessGameId)
      .set( 'userId', this.userService.UserData.id + '');
    console.log('Try to start streaming: ',params);
    return this.http.post<any>(this.StreamingServiceURL + '/start', params);
    //http://localhost:8080/stream/start
  }

  sendSAN(SAN: string){
    const params =new HttpParams()
      .set( 'chessGameId', this.chessGameService.GameSetting.chessGameId)
      .set( 'SEN', SAN);
    console.log('Try to send SAN code to server: ',params);
    return this.http.post<any>(this.PlaychessgameServiceURL + '/SEN', params);
    //http://localhost:8080/PlayChessGame/SEN
  }
}
