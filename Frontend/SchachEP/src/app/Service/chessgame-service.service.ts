import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from '../Model/User'
import {UserServiceService} from './user-service.service'
import {ChessGame} from '../Model/ChessGame'

@Injectable({
  providedIn: 'root'
})
export class ChessgameServiceService {
  private ChessgameServiceURL: string;
  GameSetting : ChessGame; //Game settings when users create games are stored here.

  constructor(private http: HttpClient ,private userService: UserServiceService) {
    this.ChessgameServiceURL = 'http://localhost:8080/chessgame'
    this.GameSetting = new ChessGame();
  }

  public acceptGameRequest(user : User, chessGameId : number){
    const params= new HttpParams()
      .set('requesterID', user.id as number)
      .set('invitedId', this.userService.UserData.id as number)
      .set('chessGameId',chessGameId);
    //"requestedUser" is the user who initiated the invitation,
    //"invitedUser" is the invited user.
    console.log(params);
    return this.http.post<Boolean>(this.ChessgameServiceURL + "/acceptedGameRequest", params);
    //http://localhost:8080/chessgame/acceptedGameRequest
  }

  public createChessGame(nameOfChessGame : string, timer : number, chessGameId : number){
    const params =new HttpParams()
      .set( 'nameOfChessGame', nameOfChessGame)
      .set( 'timer', timer)
      .set('chessGameId', chessGameId);
    console.log('Sending!!!');
    console.log(params);
    return this.http.put<Boolean>(this.ChessgameServiceURL + "/createChessGame", params);
    //http://localhost:8080/chessgame/createChessGame
  }

  public denyGameRequest(user : User, chessGameId : number){
    // const params= new HttpParams()
    //   .set('requesterID', this.userService.UserData.id as number)
    //   .set('invitedId', user.id as number);
    // console.log(params);

    // const params = {
    //   requesterID : user.id as number,
    //   invitedId : this.userService.UserData.id as number};
    // return this.http.delete<Boolean>(this.ChessgameServiceURL + "/denyGameRequest", {params : params});
    console.log(this.ChessgameServiceURL + '/denyGameRequest/requesterid='
      + this.userService.UserData.id + '/invitedid=' + user.id + '/chessgameid=' + chessGameId);
    return this.http.delete<Boolean>(this.ChessgameServiceURL + '/denyGameRequest/requesterid='
      + this.userService.UserData.id + '/invitedid=' + user.id + '/chessgameid=' + chessGameId);

    //http://localhost:8080/chessgame/denyGameRequest
  }

  public findInvitation(userID : number){
    const params = {invitedUser : userID};
    //"invitedUser" stores the ID of the user looking up the invitation list.
    console.log('findInvitation',params);
    return this.http.get<ChessGame[]>(this.ChessgameServiceURL + "/findInvitation" , {params : params});
    //http://localhost:8080/chessgame/findInvitation
  }

  public getExistingGames(userID : number){
    const params= new HttpParams()
      .set('usertofind', userID);
    console.log(params);
    return this.http.post<ChessGame[]>(this.ChessgameServiceURL + "/getExistingGames" , params);
    //http://localhost:8080/chessgame/getExistingGames
  }

  public chooseOpponent(userID : number){
    const params = {userToChooseOpponent : userID};
    return this.http.get<ChessGame[]>(this.ChessgameServiceURL + "/chooseOpponent" , {params : params});
    //http://localhost:8080/chessgame/chooseOpponent
  }

  public inviteToChessGame(userID : number){
    const params= new HttpParams()
      .set('requesterId', this.userService.UserData.id as number)
      .set('invitedId', userID);
    console.log(params);
    // return this.http.post<ChessGame>(this.ChessgameServiceURL + "/invite", params);
    return this.http.post<ChessGame>(this.ChessgameServiceURL + '/invite', params);
    //http://localhost:8080/chessgame/invite
  }

  public joinGame(chessGame:number){
    const  params = new HttpParams()
      .set('chessGameId', chessGame)
      .set('user', this.userService.UserData.id as number);
    console.log(params);
    return this.http.put<boolean>(this.ChessgameServiceURL + '/joinGame', params);
  }

  public stopGame(chessGame:number){
    const  params = new HttpParams()
        .set('chessGameId', chessGame)
        .set('stoppingUser', this.userService.UserData.id as number);
    console.log(params);
    return this.http.put<boolean>(this.ChessgameServiceURL + '/stopGame', params);
  }
}
