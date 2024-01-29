import { Injectable } from '@angular/core';
import {User} from "../Model/User";
import {UserServiceService} from "./user-service.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ReplayServiceService} from "./replay-service.service";
import {PGNDTO} from "../Model/PGNDTO";

@Injectable({
  providedIn: 'root'
})
export class ImportPGNService {
private importPgnURL:string;
public listPGN:string[]=[];
PlaychessgameServiceURL:string;
playBotGameServiceURL:string;


  constructor(private http: HttpClient ,
              private userService:UserServiceService) {
    this.importPgnURL='http://localhost:8080/ImportPGN'
    this.PlaychessgameServiceURL = 'http://localhost:8080/PlayChessGame'
    this.playBotGameServiceURL = 'http://localhost:8080/chessBot'
  }
  public importPGN(pgn:string){
    const params=new HttpParams()
      .set('PGN',pgn)
      .set('UserID',this.userService.UserData.id as number);
    console.log('userId',this.userService.UserData.id)
    return this.http.post<Boolean>(this.importPgnURL+"/importPGN",params);
  }
  public listPgn(){
    const params =new HttpParams()
      .set('User',this.userService.UserData.id as number);
    return this.http.get<string[]>(this.importPgnURL+"/listPGN",{params:params});
  }
  public exportPGN(chessGameId:number){
    const params = new HttpParams()
      .set('chessGameId',chessGameId);
    return this.http.get<PGNDTO>(this.PlaychessgameServiceURL+"/exportPGN",{params:params});
  }
  public exportBotPGN(chessBotId:number){
    const params = new HttpParams()
      .set('chessBotId',chessBotId);
    return this.http.get<PGNDTO>(this.playBotGameServiceURL+"/exportPGN",{params:params});
  }
}
