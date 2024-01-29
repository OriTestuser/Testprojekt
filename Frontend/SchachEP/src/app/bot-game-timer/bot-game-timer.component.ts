import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import {BotGameBoardService} from "../bot-game/bot-game-board.service";
import {BotGameStateService} from "../bot-game/bot-game-state.service";
import {ChessBotServiceService} from "../Service/chess-bot-service.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-bot-game-timer',
  templateUrl: './bot-game-timer.component.html',
  styleUrls: ['./bot-game-timer.component.css']
})
export class BotGameTimerComponent implements OnInit, OnDestroy {
  @Input() duration: number = 0;
  remainingTime: number = 0;
  timerSubscription: Subscription = new Subscription();

  constructor(private boardService: BotGameBoardService,
              private stateService: BotGameStateService,
              private chessBotService: ChessBotServiceService,
              private router: Router,) { }

  ngOnInit(): void {
    this.remainingTime = this.duration;
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.boardService.remainingTime = this.remainingTime;
      }
      else{
        this.stateService.setState(99);
        if(this.boardService.gameID)
        this.chessBotService.endIfTimerExpired(this.boardService.gameID).subscribe(
          (response) =>{
            console.log('endIfTimerExpired: ', response);
            alert('Time Out');
            this.router.navigate(['/botGameList']);
          },
          (error) =>{
            // handling errors
            alert("ERROR");
            console.error('Ein Fehler ist aufgetreten：', error);
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // 在组件销毁时取消订阅
    }
  }
}

