import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {ChessGame} from "../Model/ChessGame";
import {UserServiceService} from "../Service/user-service.service";
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
@Component({
  selector: 'app-my-invite',
  templateUrl: './my-invite.component.html',
  styleUrls: ['./my-invite.component.css']
})
export class MyInviteComponent {
  inviteList: ChessGame[] = [];

  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService) {
  }

  ngOnInit(): void{
    if(this.userService.UserData.id != undefined){
      this.chessGameService.findInvitation(this.userService.UserData.id).subscribe(
        (response) =>{
          if(response){
            this.inviteList = response;
            this.successOnFindInvitation();
          }
          else {
            this.leerFindInvitation();
          }
          console.log(response);
      },
        (error) =>{
          // handling errors
          this.errorOnFindInvitation();
          console.error('Ein Fehler ist aufgetreten：', error);
        }
      );
    }
    else {
      this.cantFindUser();
    }
  }

  acceptRequest(requestedUser : User, chessGameId :number){
    // Handle logic for accepting game invitation
    console.log('Accept game invitation for user with ID ', requestedUser.id);
    this.chessGameService.acceptGameRequest(requestedUser, chessGameId).subscribe(
      (response) =>{
        if(response){
          this.successOnAcceptRequest(chessGameId);
        }
        else{
          this.errorOnAcceptRequest();
          console.log('Fehler beim Zustimmen der Spieleinladung im Backend.');
        }
      },
      (error) =>{
        // handling errors
        this.errorOnAcceptRequest();
        console.error('Ein Fehler ist aufgetreten：', error);
      }
    );
  }

  denyRequest(requestedUser : User, chessGameId :number){
    // Handle logic for rejecting game invitation
    console.log('Deny game invitation for user with ID ', requestedUser.id);
    this.chessGameService.denyGameRequest(requestedUser, chessGameId).subscribe(
      (response) =>{
        if(response){
          this.successOnDenyRequest(chessGameId);
        }
        else{
          this.errorOnDenyRequest();
          console.log('Fehler beim Ablehnen der Spieleinladung im Backend.');
        }
      },
      (error) =>{
        // handling errors
        this.errorOnDenyRequest();
        console.error('Ein Fehler ist aufgetreten：', error);
      }
    );
  }

  successOnAcceptRequest(GameId : number){
    console.log('Game invitation Accepted successfully.');
    alert("Die Spieleinladung wurde angenommen.");
    this.inviteList = this.inviteList.filter((invite) => invite.chessGameId !== GameId);
    // window.location.reload();
  }

  errorOnAcceptRequest(){
    console.log('An error occurred while Accepting the game invitation.');
    alert("Die Spieleinladung konnte nicht angenommen werden.");
  }

  successOnDenyRequest(GameId : number){
    console.log('Game invitation rejected successfully.');
    alert("Die Spieleinladung wurde abgelehnt.");
    this.inviteList = this.inviteList.filter((invite) => invite.chessGameId !== GameId);
    // window.location.reload();
  }

  errorOnDenyRequest(){
    console.log('An error occurred while rejecting the game invitation.');
    alert("Die Spieleinladung konnte nicht abgelehnt werden.");
  }

  successOnFindInvitation(){
    console.log('Einladungsliste erfolgreich erhalten.');
  }

  errorOnFindInvitation(){
    this.leerFindInvitation();
  }

  leerFindInvitation(){
    //When the invitation list is empty.
    console.log('Die Einladungsliste ist leer.');
    alert("Es sind noch keine Spieleinladungen eingegangen.");
  }

  cantFindUser(){
    //When the currently logged in user cannot be found.
    console.log('Login user data is lost.');
    alert("Fehler: Bitte melden Sie sich erneut an.");
    this.router.navigate(['/login']);
  }

  acceptOrDenyInvite(AcceptOrDeny: boolean, user: User | undefined, chessGameId : number) {
    //Solve the problem of undefined data.
    if (user !== undefined) {
      if (AcceptOrDeny) {
        //AcceptOrDeny is true for consent, otherwise it is rejection.
        this.acceptRequest(user,chessGameId);
      } else {
        this.denyRequest(user,chessGameId);
      }
      this.inviteList = this.inviteList.filter((inviteList) => inviteList.getUserId1() !== user.id);
    }
  }
}
