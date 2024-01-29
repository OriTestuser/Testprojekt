import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {UserServiceService} from "../Service/user-service.service";
import{FriendsServiceService} from "../Service/friends-service.service";
import{ChessgameServiceService} from "../Service/chessgame-service.service";

@Component({
  selector: 'app-twofactorauthor',
  templateUrl: './twofactorauthor.component.html',
  styleUrls: ['./twofactorauthor.component.css']
})
export class TwofactorauthorComponent {
  twoFactorAuthor: string = '';

  // loginUser: User;//Store the data of the user who want to login here

  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService) {
  }

  onSubmit() {
    this.userService.UserData.token = this.twoFactorAuthor;
    this.userService.UserData.superToken=this.twoFactorAuthor;
    if(this.userService.UserData.id)
    this.userService.verifyTwoFactorAuthor(this.userService.UserData.id,this.twoFactorAuthor)
      .subscribe((response) => {
          if (response!=null) {
            // User registration is successful, can perform redirection or other operations
            console.log('BenutzerVerifizierung  erfolgreich', response,this.userService.CurrentUserData);
            this.gotoMainpage();
          } else {
            console.log('Fehler bei der Anmeldung');
            this.errorTFA();

          }
        },
        (error) => {
          console.error('Ein Fehler ist aufgetreten：', error);
          this.errorWithSubmit();
        }
        // handling errors
      );
  }
  private gotoMainpage()
  {
    this.router.navigate(['mainLobby']);
    //If verify is successful, go to the main lobby
  }
  private errorTFA(){
    alert('TwoFactorAuthorCode is wrong')
  }
  //Reply: Wrong code
  private errorWithSubmit()
  {
    alert("ERROR");
  }
}
