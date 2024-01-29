import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from '../Model/User'
import {ChessClub} from "../Model/ChessClub";
import {ChessGame} from "../Model/ChessGame";
import {ChessBot} from "../Model/ChessBot";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private UserserviceURL: string;
  private LeaderboardURL: string;
  UserData: User;
  //This will not change after the user logs in
  CurrentUserData: User;
  //This stores the data of the user currently being viewed,
  //such as searches or invitations.

  constructor(private http: HttpClient) {
    this.UserserviceURL = 'http://localhost:8080/user';
    this.UserData = new User();
    this.CurrentUserData = new User();
    this.LeaderboardURL = 'http://localhost:8080/leaderboard';
  }

  public login(email: string, password: string) {
    const requestBody = {email, password};
    //Create a request body object containing email and password
    return this.http.post<User>(this.UserserviceURL + "/userLogin", requestBody);
    //http://localhost:8080/user/userLogin
  }

  public signup(userprofile: User) {
    const requestBody = userprofile;
    //Create a request body object containing user profile
    return this.http.post<User>(this.UserserviceURL + "/createUser", requestBody);
    //http://localhost:8080/user/createUser
  }

  public verifyTwoFactorAuthor(userId:number,twoFA:string) {
    const params = new HttpParams()
      .set("userId",userId)
      .set("twoFA",twoFA);
    //Create a request body object containing user profile
    return this.http.put<User>(this.UserserviceURL + "/twoFactorAuthentication", params);
    //http://localhost:8080/user/twoFactorAuthentication
  }


  public getUserProfile(id:number) {
    return this.http.get<User>(this.UserserviceURL + "/getProfile/" +id)
  }
  // public getFriends(friendId:number){
  //   return this.http.get<User>(this.UserserviceURL+"user/friends/view-friendlist/userid="+friendId+"/requesterid="+this.UserData.id);
  // }
  // public sendFriendRequest(addUserId:number,requestUserId:number){
  //   const requestBody={addUserId,requestUserId}
  // return this.http.post<User>(this.UserserviceURL+"/user/friends/sendRequest",requestBody)
  // }
  // public deleteFriend(friendId:number,requestId:number){
  //   const requestBody={friendId,requestId};
  //   const url = `${this.UserserviceURL}/user/friends/delete-friend/friendid=${friendId}/requesterid=${requestId}`;
  //   return this.http.post<User>(url,null);
  // }

  public updatePrivacy(user:User){
    const requestBody = user;
    return this.http.put<Boolean>(this.UserserviceURL + "/updatePrivacy",requestBody);
  }

  public findUserByEmailAddress(email : string){
    const params = { email: email };
    return this.http.get<User[]>(this.UserserviceURL + "/found",{params:params});
  }

  public isAuthenticated(){
    if(this.UserData.id == undefined){
      return false;
    }
    else return true;
  }
  public getLeaderboard(){
      return this.http.get<User[]>(this.LeaderboardURL + "/showLeaderboard");
    }
public getChessClubs(userId:number){
    const params = new HttpParams()
      .set("userId",userId);
    return this.http.get<ChessClub[]>(this.UserserviceURL+"/chessclubs",{params});
}
public getLastGames(){
    const params = new HttpParams()
      .set("userId",this.UserData.id as number);
    return this.http.get<Object[]>(this.UserserviceURL+"/getLastGames",{params:params})
}
public findChessGame(userId:number,LocalDateTime:Date){
    const params = new HttpParams()
      .set("userId",userId)
      .set("LocalDateTime",LocalDateTime.toISOString());
    return this.http.get<ChessGame>(this.UserserviceURL+"/findchessgame",{params:params})
}
public findBotGame(userId:number,LocalDateTime:string){
  const params = new HttpParams()
    .set("userId",userId)
    .set("LocalDateTime",LocalDateTime);
  return this.http.get<ChessBot>(this.UserserviceURL+"/findbotgame",{params:params});
}
}
