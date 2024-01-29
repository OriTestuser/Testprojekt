import {Component, numberAttribute} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {UserServiceService} from "../Service/user-service.service";
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent {
  userProfile: User = this.userService.UserData;
  searchUserProfile: User
  email: string = "";

  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService: FriendsServiceService,
              private chessGameService: ChessgameServiceService) {
    this.userProfile = new User();
    this.searchUserProfile = new User();
  }

  onSubmit() {
    this.searchUserProfile = new User();

    if(this.email != ''){
      //Check if the user entered the email address.
      console.log('Zu findende E-Mail-Adresse:', this.email);

      this.userService.findUserByEmailAddress(this.email).subscribe(
        (response : any) => {
          if (response) {
            this.searchUserProfile = response;
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
      this.email = '';
    }
    else {
      this.errorOnNoEnter();
    }
  }

  getUserProfile() {
    this.userService.CurrentUserData=this.searchUserProfile;
    console.log('',this.userService.CurrentUserData);
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
}
