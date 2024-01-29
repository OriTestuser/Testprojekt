import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserServiceService} from "./user-service.service";
import {Observable} from "rxjs";
import {User} from "../Model/User";

@Injectable({
  providedIn: 'root'
})
export class ChesspuzzleServiceService {
  private chessPuzzleURL: string;

  constructor(private http: HttpClient,
              private userServiceService: UserServiceService ) {
    this.chessPuzzleURL = 'http://localhost:8080/chessPuzzle'
  }

  public importChessPuzzle(fileData: string[], playerId: number){
      const params = new HttpParams()
      .set('chessPuzzleId', fileData[0])
        .set('fen', fileData[1])
        .set('moves', fileData[2])
      .set('playerId', playerId);
      console.log(params);

      return this.http.post<Boolean>(this.chessPuzzleURL + '/importChessPuzzle', null, { params });
      //http://localhost:8080/chessPuzzle/importChessPuzzle
  }
  public solve(puzzleId : string, madeMove:string){
    const params =new HttpParams()
      .set( 'puzzleId', puzzleId)
      .set( 'userId', this.userServiceService.UserData.id as number)
      .set( 'madeMove', madeMove);
    console.log(params);

    return this.http.put<Boolean>(this.chessPuzzleURL + '/solve', params);
    //http://localhost:8080/chessPuzzle/solve
  }
  public getData() {
    const params = {userId: this.userServiceService.UserData.id as number,};
    console.log(params);
    return this.http.get<any>(this.chessPuzzleURL+'/getData',{params:params});
  }
}
