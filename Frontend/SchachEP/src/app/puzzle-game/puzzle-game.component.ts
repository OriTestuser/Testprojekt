import { Component, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import { PuzzleDataService } from "../puzzle/puzzle-data.service";
import {interval, Subscription} from "rxjs";
import {UserServiceService} from "../Service/user-service.service";
import {PuzzleRulesEigineService} from "../puzzle/puzzle-rules-eigine.service";


@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.component.html',
  styleUrls: ['./puzzle-game.component.css']
})
export class PuzzleGameComponent {
  puzzleId :string = '';
  FEN :string = '';
  moves :string = '';
  puzzleData :string[] = [];
  boardData :string[][] = [];

  showMoves: boolean = false;
  public selectPosition :number[] = [];

  yourFirstName :string = '';
  yourLastName :string = '';
  yourPoint :number = 0;

  private readonly refreshSubscription: Subscription;

  constructor(
    public puzzleDataService: PuzzleDataService,
    public userServiceService: UserServiceService,
    public puzzleRuleEngine: PuzzleRulesEigineService
  ) {const refreshInterval = interval(500);
    this.refreshSubscription = refreshInterval.subscribe(() => {
      this.refreshComponent();});
  }

  ngOnInit(){
    this.setUserData();
    this.puzzleData = this.puzzleDataService.playPuzzleData;

    this.puzzleId = this.puzzleData[0];
    this.FEN = this.puzzleData[1];
    this.moves = this.puzzleData[2];
    this.puzzleDataService.initializeRestMove();
    this.puzzleDataService.myTurn = false;
    console.log('this.selectPosition = ', this.selectPosition);

    this.boardData = this.puzzleDataService.fenToBoard(this.FEN);
    this.puzzleDataService.boardData = this.boardData;


    console.log('boardData: ', this.boardData);
  }
  refreshComponent(){
    console.log('myTurn = ',this.puzzleDataService.myTurn);
    this.puzzleDataService.initializeRestMove();
    this.boardData = this.puzzleDataService.boardData;
    if(!this.puzzleDataService.myTurn){
      this.puzzleRuleEngine.botMove();
    }
    this.selectPosition = this.puzzleRuleEngine.selectPosition;
  }

  clickShowMoves() {
    this.showMoves = !this.showMoves;
  }
  getChessCellBackground(row: number, col: number): string {
    if ((row + col) % 2 === 0) {
      return '../../assets/chess-piece/BGI_White.png';
    } else {
      return '../../assets/chess-piece/BGI_Black.png';
    }
  }
  setUserData(){
    if(this.userServiceService.UserData.firstName &&
      this.userServiceService.UserData.lastName &&
      this.userServiceService.UserData.points)
    {
      this.yourFirstName = this.userServiceService.UserData.firstName;
      this.yourLastName = this.userServiceService.UserData.lastName;
      this.yourPoint = this.userServiceService.UserData.points;
    }
  }
  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
