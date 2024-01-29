import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from '../Model/User'
import {ChessClub} from "../Model/ChessClub";
import {ChessClubMembership} from "../Model/ChessClubMembership";

@Injectable({
  providedIn: 'root'
})
export class ClubServiceService {
  private ClubServiceURL:string;
  //This will not change after the user logs in
  CurrentClubData: ChessClub | undefined;
  allClubs:ChessClub[]|undefined;
  constructor(private http: HttpClient) {
    this.ClubServiceURL='http://localhost:8080/chessclub';

  }
public create(chessClubName:string,erstellerUserId:number){
    const params = new HttpParams()
      .set('chessClubName',chessClubName)
      .set('erstellerUserId',erstellerUserId)
  return this.http.post<ChessClub>(this.ClubServiceURL+'/create',params);
}
public showChessClubs(){
    return this.http.get<ChessClub[]>(this.ClubServiceURL+'/showChessClubs')
}
public  joinChessClub(chessClubName:string,requesterUserId:number){
    const params = new HttpParams()
      .set("chessClubName",chessClubName)
      .set("requesterUserId",requesterUserId);
    return this.http.put<ChessClubMembership>(this.ClubServiceURL+"/joinChessClub",params)
}
}
