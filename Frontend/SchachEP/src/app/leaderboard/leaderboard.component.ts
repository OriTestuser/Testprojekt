import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {Friendship} from '../Model/Friendship'
import {UserServiceService} from "../Service/user-service.service";
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  leaderboard: User[] = [];
  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService: FriendsServiceService,
              private chessGameService: ChessgameServiceService,
              private sanitizer: DomSanitizer) {

  }

  ngOnInit(){
    const userId = this.userService.UserData.id as number;
    this.userService.getLeaderboard().subscribe(
      (leaderboard:any)=>{
        this.leaderboard=leaderboard;
        console.log('leaderboard',this.leaderboard);
      })}

}
