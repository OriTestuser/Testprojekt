import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from '../Model/User'
import {UserServiceService} from './user-service.service'
import {ChessGame} from '../Model/ChessGame'
import {ChessgameServiceService} from "./chessgame-service.service";

@Injectable({
  providedIn: 'root'
})
export class LiveSeriveService {
    private LiveServiceURL: string;
    public liveId:number|undefined;
  private PlaychessgameServiceURL :string;
  constructor(private http: HttpClient ,private userService: UserServiceService,
              private chessgameService:ChessgameServiceService ) {
    this.LiveServiceURL = 'http://localhost:8080/stream'
    this.PlaychessgameServiceURL = 'http://localhost:8080/PlayChessGame'
  }
  public start(chessGameId:number,userId:number){
    const params = new HttpParams()
        .set('chessGameId',chessGameId)
        .set('userId',userId);
    return this.http.post<ChessGame>(this.LiveServiceURL+'/start',params)
  }
  public showStreams(){
    return this.http.get<ChessGame[]>(this.LiveServiceURL+'/showStreams');
  }
  public getChessGameState(chessGameId:number){
    const params = new HttpParams()
        .set("chessGameId",chessGameId);
    return this.http.get<ChessGame>(this.LiveServiceURL+'/getChessGameState',{params:params});
  }

  public FEN(chessGameId:number) {
    const params= {chessGameId:chessGameId,};
    console.log('Get FEN', params);
    return this.http.get<string[]>( this.PlaychessgameServiceURL+"/FEN" ,{params:params});
    //http://localhost:8080/PlayChessGame/FEN
  }
}
