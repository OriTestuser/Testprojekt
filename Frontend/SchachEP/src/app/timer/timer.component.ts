import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {PlaychessgameServiceService} from "../Service/playchessgame-service.service";
import {interval, Subscription} from "rxjs";
import {BoardService} from "../game/board.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnDestroy{
  @Input() myColor: string = '';
  public  timer: number = 999;
  private readonly refreshSubscription: Subscription;
  constructor(private playChessGameService: PlaychessgameServiceService,
              private cdr: ChangeDetectorRef,
              private boardService: BoardService,
  ) {const refreshInterval = interval(1000);
    this.refreshSubscription = refreshInterval.subscribe(() => {
      this.refreshComponent();
    });}
getTimer(myColor: string){
  console.log('TEST Timer');
  this.playChessGameService.getTimer(myColor).subscribe(
    (response) =>{
      console.log('get /Timer from backend:', response);
      this.timer = response.valueOf();
      //number is a primitive, but Number is a wrapper object.
    },
    (error) => {
      console.error('Ein Fehler ist aufgetreten：', error);
      this.errorWithSubmit();
      // handling errors
    }
  );
}
  errorWithSubmit(){
    alert("ERROR");
  }

  refreshComponent() {
    console.log('refresh');
    this.cdr.detectChanges();
    this.getTimer(this.myColor);
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
