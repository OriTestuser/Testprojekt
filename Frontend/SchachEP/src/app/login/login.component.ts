import { Component } from '@angular/core';
import {UserServiceService} from "../Service/user-service.service";
import {Router} from "@angular/router";
import {User} from '../Model/User'
import {forceAutocomplete} from "@angular/cli/src/utilities/environment-options";
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {ClubServiceService} from "../Service/club-service.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'SchachEP';


  public loginButtonText: string = 'Login';


  public email: string = '' ;
  public password: string = '';
  public lastEmail: string = '1';
  public lastPassword: string = '1';

  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService,
              private clubService:ClubServiceService) {
  }

  onSubmit() {
    this.lastPassword = this.password;
    this.lastEmail = this.email;

    let input = this.email as string;
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let matchFound = regex.test(input);
  console.log(this.userService.UserData);
    if (matchFound) {

      this.loginButtonText = 'Logging...';

      //if the e-mail address is in the correct form
      this.userService.login(this.email,this.password).subscribe(
        (response) => {
          if (response) {
            this.userService.UserData = response;
            this.userService.CurrentUserData=response;
            // Login successful, redirection or other operations can be performed
            console.log('Anmeldung erfolgreich', response,this.userService.CurrentUserData);
            this.gotoTwoFactorAuthor();
          } else {
            // Login failed
            console.log('Fehler bei der Anmeldung');
            this.errorOnEmailPassword();
          }
        },
        (error) => {
          // handling errors
          console.error('Ein Fehler ist aufgetreten:', error);
          //Fehlermeldung vom Backend erhalten
          this.errorWithSubmit();
        });
    }
    else{
      alert("Die E-Mail-Adresse hat das falsche Format.");
      //if the e-mail address is not in the correct form
    }


  }
  public  canClickLogin(){
    //Check if the same data has been entered twice.
    return this.lastEmail != this.email && this.lastPassword != this.password;
  }
  private errorWithSubmit()
  {
    alert("ERROR");
  }

  private errorOnEmailPassword()
  {
    alert("Falsche E-Mail-Adresse oder falsches Passwort.");
    //Reply: Wrong email address or password
  }

  private gotoMainpage()
  {
    this.router.navigate(['mainLobby']);
    //If registration is successful, go to the main lobby
  }
  private gotoTwoFactorAuthor(){
    this.router.navigate(['twoFactorAuthor']);
  }



  }
