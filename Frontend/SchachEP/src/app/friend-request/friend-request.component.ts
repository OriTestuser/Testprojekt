import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {UserServiceService} from "../Service/user-service.service";
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent {
  requestUsers: User[] = [];

  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService) {
    // this.requestUsers = [new User()];
  }

  ngOnInit(): void {
    if(this.userService.UserData.id != undefined){
      this.friendsService.showMyFriendRequests(this.userService.UserData.id).subscribe(
        (response) => {
            this.requestUsers = response;
            this.successOnShowRequests();
            console.log(response);
        },
        (error) => {
          // handling errors
          if(error == 404) {
            this.errorOnShowRequests();
          }
          console.error('Ein Fehler ist aufgetreten：', error);
        }
      );
    }
    else{
      this.cantFindUser();
    }
  }
  acceptFriend(userId: number) {
    // Handle logic for accepting friend requests
    console.log('Accept friend request for user with ID ', userId);
    this.friendsService.acceptFriend(userId).subscribe(
      (response) => {
        if (response) {
          this.successOnAcceptFriend(userId);
        } else {
          this.errorOnAcceptFriend();
          console.log('Das Hinzufügen von Freunden im Backend ist fehlgeschlagen.');
        }
      },
      (error) => {
        // handling errors
        this.errorOnAcceptFriend();
        console.error('Ein Fehler ist aufgetreten：', error);
      }
    );
  }

  denyFriendRequest(userId: number) {
    // Handle logic for rejecting friend requests.
    console.log('Deny friend request for user with ID ', userId);
    this.friendsService.denyFriendQequest(userId).subscribe(
      (response) => {
        if (response) {
          this.successOnDenyFriend(userId);
        } else {
          this.errorOnDenyFriend();
          console.log('Rejection of friend application failed in the backend.');
        }
      },
      (error) => {
        // handling errors
        this.errorOnDenyFriend();
        console.error('Ein Fehler ist aufgetreten：', error);
      }
    );
  }

  errorOnAcceptFriend(){
    console.log('An error occurred while accepting the friend request.');
    alert("Beim Akzeptieren der Freundschaftsanfrage ist ein Fehler aufgetreten.");
  }

  successOnAcceptFriend(acceptId : number){
    console.log('Friend request accepted successfully.');
    alert("Freundschaftsanfrage erfolgreich angenommen.");
    this.requestUsers = this.requestUsers.filter((friend) => friend.id !== acceptId);
    // window.location.reload();
  }

  errorOnDenyFriend(){
    console.log('An error occurred while rejecting the friend request.');
    alert("Beim Ablehnen der Freundschaftsanfrage ist ein Fehler aufgetreten.");
  }

  successOnDenyFriend(denyId : number){
    console.log('Friend request declined successfully.');
    alert("Freundschaftsanfrage wurde erfolgreich abgelehnt.");
    this.requestUsers = this.requestUsers.filter((friend) => friend.id !== denyId);
    // window.location.reload();
  }

  cantFindUser(){
    //When the currently logged in user cannot be found.
    console.log('Login user data is lost.');
    alert("Fehler: Bitte melden Sie sich erneut an.");
  }
  successOnShowRequests(){
    console.log('Eine erfolgreiche Freunde-Bewerbungsliste.');
  }

  errorOnShowRequests(){
    alert("Es sind noch keine Freundschaftsanfragen eingegangen.");
    //Error 404:No friend requests have been received yet.
  }

  acceptOrDenyFriend(AcceptOrDeny: boolean, userId: number | undefined) {
    //Solve the problem of undefined data.
    if (userId !== undefined) {
      if (AcceptOrDeny) {
        //AcceptOrDeny is true for consent, otherwise it is rejection.
        this.acceptFriend(userId);
      } else {
        this.denyFriendRequest(userId);
      }
      this.requestUsers = this.requestUsers.filter((requestUsers) => requestUsers.id !== userId);
    }
  }

}
