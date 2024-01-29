import {Injectable, numberAttribute} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from '../Model/User'
import {UserServiceService} from './user-service.service'
import {Friendship} from '../Model/Friendship'

@Injectable({
  providedIn: 'root'
})
export class FriendsServiceService {
  private FriendsserviceURL: string;

  constructor(private http: HttpClient ,private userService: UserServiceService) {
    this.FriendsserviceURL = 'http://localhost:8080/friends'
  }

  public acceptFriend(UserID : number){
    const params =new HttpParams()
      .set( 'userId1', UserID)
      .set( 'userId2', this.userService.UserData.id as number);

    //"userId1" is the ID of the user who received the friend request,
    // and "userId2" is the ID of the user who sent the friend request.
    return this.http.put<Boolean>(this.FriendsserviceURL + '/acceptFriend', params);
    //http://localhost:8080/friends/acceptFriend
  }

  public deleteFriend(friendId:number){
    //"friendid" is the deleted friend,
    //"requesterid" is the owner of the friend list.
    return this.http.delete<Boolean>(this.FriendsserviceURL + '/delete-friend/friendid=' + friendId + '/requesterid=' + this.userService.UserData.id);
    //http://localhost:8080/friends/delete-friend/friendid={friendId}/requesterid={requesterId}
  }


  public denyFriendQequest(UserID : number){
    const params = {
      userId1 : UserID,
      userId2 : this.userService.UserData.id as number};
    //"userId1" is the ID of the user who received the friend request,
    //"userId2" is the ID of the user who sent the friend request.
    return this.http.delete<Boolean>(this.FriendsserviceURL + '/denyFriendRequest', {params : params});
    //http://localhost:8080/friends/denyFriendRequest
  }

  // public getFriends(friendId:number){
  //   const url = `${this.FriendsserviceURL}/view-friendlist
  //   /userid=${friendId}
  //   /requesterid=${this.userService.UserData.id}`
  //   //"userid" is the owner of the friend list being viewed,
  //   //"requesterid" is the person who initiated the application.
  //   return this.http.get<User[]>(url);
  //   //http://localhost:8080/friends/view-friendlist/userid={userId}/requesterid={requesterId}
  // }
public getFriends(friendId:number){
    const params = new HttpParams()
      .set( 'userid', friendId.toString())
      .set( 'requesterid', (this.userService.UserData.id as number).toString())

  return this.http.get<User[]>(this.FriendsserviceURL + '/view-friendlist/userid=' + friendId + '/requesterid=' + this.userService.UserData.id);
    // return this.http.get<User[]>(this.FriendsserviceURL+'/view-friendlist/', { params });
  }

  public sendRequest(UserId:number){
    const params= new HttpParams()
      .set('userId1', this.userService.UserData.id as number)
      .set('userId2', UserId as number);
    //"userID1" is the person who initiated the application,
    //"userID2" is the person who received the friend application.
    console.log(params);
    return this.http.post<Boolean>(this.FriendsserviceURL+"/sendRequest",params);
    //http://localhost:8080/friends/sendRequest
  }


  public showMyFriendRequests(UserId:number) {
    const params = {userId: UserId,};
    return this.http.get<User[]>(this.FriendsserviceURL+'/showMyFriendRequests',{params:params});
}

}
