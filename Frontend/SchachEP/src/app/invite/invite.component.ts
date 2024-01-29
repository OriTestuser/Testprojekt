import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {UserServiceService} from "../Service/user-service.service";
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent {

  friendList: User[] = [];
  showFriendListFlag = false; // Control display of friends list
  showInviteFormFlag = false; // Control display of invitation form
  searchEmail: string = '';
  searchedUserProfile: User;

  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService) {
    this.searchedUserProfile = new User();
  }

  showFriendList() {
    //Get friends list.
    const userId = this.userService.CurrentUserData.id as number;
    this.friendsService.getFriends(userId).subscribe((friends:any) => {
      this.friendList = friends;
    });
    //Change to show friends list.
    this.showFriendListFlag = true;
    this.showInviteFormFlag = false;
  }

  showInviteForm() {
    //Change to show invite form.
    this.showFriendListFlag = false;
    this.showInviteFormFlag = true;
  }

  searchUser() {
    this.searchedUserProfile = new User();

    if(this.searchEmail != ''){
      //Check if the user entered the email address.
      console.log('Zu findende E-Mail-Adresse:', this.searchEmail);

      this.userService.findUserByEmailAddress(this.searchEmail).subscribe(
        (response : any) => {
          if (response) {
            this.searchedUserProfile = response;
            console.log('Der Benutzer wurde erfolgreich gefunden:', response);
          }
        },
        (error) => {
          // handling errors
          console.error('Ein Fehler ist aufgetreten：', error);
          if(error.status == 404) {
            this.errorOnNotFind();
            //When error: 404 is returned,
            //it means that the user with the current email cannot be found in the database.
          }
        });
      //Clear the email input box.
      this.searchEmail = '';
    }
    else {
      this.errorOnNoEnter();
    }
  }

  inviteFriend(friend : User) {
    if(friend.id != undefined){
      this.invite(friend.id);
      console.log('Einladung an Freund mit ID ', friend.id);
    }

  }

  inviteUser(user : User) {
    if(user.id != undefined){
      this.invite(user.id);
      console.log('Einladung an Benutzer mit ID ',user.id);
    }

  }

  public errorOnNotFind(){
    alert("Der gesuchte Benutzer existiert nicht.");
    //Alert the user that the user's email address cannot be found.
  }

  public errorOnNoEnter(){
    console.log('ERROR: No email address entered.');
    alert("Bitte geben Sie die E-Mail-Adresse ein.");
    //Alert the user to enter their email address.
  }

  public invite(invitedId: number){
    this.chessGameService.inviteToChessGame(invitedId).subscribe(
      (response) =>{
        if(response != null){
          this.chessGameService.GameSetting = response;
          console.log(response);
        }
      },
      (error) => {
      console.error('Ein Fehler ist aufgetreten：', error);
      this.errorWithInvite();
    }
    );
  }

  public errorWithInvite(){
    alert('Beim Senden der Einladung ist ein Fehler aufgetreten.');
  }
}
