import { Component } from '@angular/core';
import {UserServiceService} from '../Service/user-service.service'
import {Router} from '@angular/router';
import {User} from '../Model/User';
import {ProfilMainComponent} from '../profil-main/profil-main.component';
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";

@Component({
  selector: 'app-mainlobby',
  templateUrl: './mainlobby.component.html',
  styleUrls: ['./mainlobby.component.css']
})
export class MainlobbyComponent {
  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService) {
  }


}
