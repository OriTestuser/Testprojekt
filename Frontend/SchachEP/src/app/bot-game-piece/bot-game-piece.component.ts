import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ChangeDetectorRef} from '@angular/core';
import {BotGameBoardService} from "../bot-game/bot-game-board.service";
import {BotGameStateService} from "../bot-game/bot-game-state.service";
import {Chess, Square, SQUARES} from 'chess.js'


@Component({
  selector: 'app-bot-game-piece',
  templateUrl: './bot-game-piece.component.html',
  styleUrls: ['./bot-game-piece.component.css']
})
export class BotGamePieceComponent {
  @Input() position: number[] = [0, 0];

  type: string = '';
  isSelected: boolean = false;
  canMove: boolean = false;
  square: Square = "a8";

  private stateCode: number = -1;
  private intervalId: any;
  public picLink: string = 'assets/chess-piece/Space.png';

  public special: boolean = false;//<-add

  constructor(private router: Router,
              private cdr: ChangeDetectorRef,
              private stateService: BotGameStateService,
              private boardService: BotGameBoardService,) {
  }
  ngOnInit(): void {
    //console.log(this.position);
    //this.positionToSquare();
    //z.b [0,0] => a8

    //this.stateService.resetChange(this.position[0], this.position[1]);
    this.getNewData();
    this.typeFENtoStr();
    this.cdr.detectChanges();


    this.intervalId = setInterval(() => {
      this.stateCode = this.stateService.getState();
      switch(this.stateCode)
      {
        case -1:
          break;
        case 30:
          break;
        case 40:
          break;
        case 41:
          break;
        case 99:
          console.log('Game end!');
          clearInterval(this.intervalId);
          break;
        default:
          // Check 'pieceToChange'
          if(this.stateService.canChange(this.position[0], this.position[1]))
          {
            this.getNewData();
            this.typeFENtoStr();
            this.stateService.resetChange(this.position[0], this.position[1]);
            this.cdr.detectChanges();//Data updates
          }
          break;
      }
    }, 1000);
  }
  onClick(){
    this.stateService.setClick(this.position[0],this.position[1]);
  }
  ngOnDestroy(){
    clearInterval(this.intervalId);
    console.log('Timer cleared.');
  }

  getNewData(){
    this.type = this.boardService.getType(this.position[0], this.position[1]);
    this.isSelected = this.boardService.checkSelected(this.position[0], this.position[1]);
    this.canMove = this.boardService.checkCanMove(this.position[0], this.position[1]);
    this.special = this.boardService.checkSpicial(this.position[0], this.position[1]);
  }

  typeFENtoStr(){
    switch (this.type) {
      case 'K':
        this.picLink = 'assets/chess-piece/White_King.png';
        break;
      case 'k':
        this.picLink = 'assets/chess-piece/Black_King.png';
        break;
      case 'Q':
        this.picLink = 'assets/chess-piece/White_Queen.png';
        break;
      case 'q':
        this.picLink = 'assets/chess-piece/Black_Queen.png';
        break;
      case 'B':
        this.picLink = 'assets/chess-piece/White_Bishop.png';
        break;
      case 'b':
        this.picLink = 'assets/chess-piece/Black_Bishop.png';
        break;
      case 'N':
        this.picLink = 'assets/chess-piece/White_kNight.png';
        break;
      case 'n':
        this.picLink = 'assets/chess-piece/Black_kNight.png';
        break;
      case 'R':
        this.picLink = 'assets/chess-piece/White_Rook.png';
        break;
      case 'r':
        this.picLink = 'assets/chess-piece/Black_Rook.png';
        break;
      case 'P':
        this.picLink = 'assets/chess-piece/White_Pawn.png';
        break;
      case 'p':
        this.picLink = 'assets/chess-piece/Black_Pawn.png';
        break;
      default:
        this.picLink = 'assets/chess-piece/Space.png';
        break;
    }
  }
  positionToSquare() {
    if (this.position[0] === 0 && this.position[1] === 0) {
      this.square = 'a8';
    } else if (this.position[0] === 1 && this.position[1] === 0) {
      this.square = 'a7';
    } else if (this.position[0] === 2 && this.position[1] === 0) {
      this.square = 'a6';
    } else if (this.position[0] === 3 && this.position[1] === 0) {
      this.square = 'a5';
    } else if (this.position[0] === 4 && this.position[1] === 0) {
      this.square = 'a4';
    } else if (this.position[0] === 5 && this.position[1] === 0) {
      this.square = 'a3';
    } else if (this.position[0] === 6 && this.position[1] === 0) {
      this.square = 'a2';
    } else if (this.position[0] === 7 && this.position[1] === 0) {
      this.square = 'a1';
    } else if (this.position[0] === 0 && this.position[1] === 1) {
      this.square = 'b8';
    } else if (this.position[0] === 1 && this.position[1] === 1) {
      this.square = 'b7';
    } else if (this.position[0] === 2 && this.position[1] === 1) {
      this.square = 'b6';
    } else if (this.position[0] === 3 && this.position[1] === 1) {
      this.square = 'b5';
    } else if (this.position[0] === 4 && this.position[1] === 1) {
      this.square = 'b4';
    } else if (this.position[0] === 5 && this.position[1] === 1) {
      this.square = 'b3';
    } else if (this.position[0] === 6 && this.position[1] === 1) {
      this.square = 'b2';
    } else if (this.position[0] === 7 && this.position[1] === 1) {
      this.square = 'b1';
    } else if (this.position[0] === 0 && this.position[1] === 2) {
      this.square = 'c8';
    } else if (this.position[0] === 1 && this.position[1] === 2) {
      this.square = 'c7';
    } else if (this.position[0] === 2 && this.position[1] === 2) {
      this.square = 'c6';
    } else if (this.position[0] === 3 && this.position[1] === 2) {
      this.square = 'c5';
    } else if (this.position[0] === 4 && this.position[1] === 2) {
      this.square = 'c4';
    } else if (this.position[0] === 5 && this.position[1] === 2) {
      this.square = 'c3';
    } else if (this.position[0] === 6 && this.position[1] === 2) {
      this.square = 'c2';
    } else if (this.position[0] === 7 && this.position[1] === 2) {
      this.square = 'c1';
    } else if (this.position[0] === 0 && this.position[1] === 3) {
      this.square = 'd8';
    } else if (this.position[0] === 1 && this.position[1] === 3) {
      this.square = 'd7';
    } else if (this.position[0] === 2 && this.position[1] === 3) {
      this.square = 'd6';
    } else if (this.position[0] === 3 && this.position[1] === 3) {
      this.square = 'd5';
    } else if (this.position[0] === 4 && this.position[1] === 3) {
      this.square = 'd4';
    } else if (this.position[0] === 5 && this.position[1] === 3) {
      this.square = 'd3';
    } else if (this.position[0] === 6 && this.position[1] === 3) {
      this.square = 'd2';
    } else if (this.position[0] === 7 && this.position[1] === 3) {
      this.square = 'd1';
    } else if (this.position[0] === 0 && this.position[1] === 4) {
      this.square = 'e8';
    } else if (this.position[0] === 1 && this.position[1] === 4) {
      this.square = 'e7';
    } else if (this.position[0] === 2 && this.position[1] === 4) {
      this.square = 'e6';
    } else if (this.position[0] === 3 && this.position[1] === 4) {
      this.square = 'e5';
    } else if (this.position[0] === 4 && this.position[1] === 4) {
      this.square = 'e4';
    } else if (this.position[0] === 5 && this.position[1] === 4) {
      this.square = 'e3';
    } else if (this.position[0] === 6 && this.position[1] === 4) {
      this.square = 'e2';
    } else if (this.position[0] === 7 && this.position[1] === 4) {
      this.square = 'e1';
    } else if (this.position[0] === 0 && this.position[1] === 5) {
      this.square = 'f8';
    } else if (this.position[0] === 1 && this.position[1] === 5) {
      this.square = 'f7';
    } else if (this.position[0] === 2 && this.position[1] === 5) {
      this.square = 'f6';
    } else if (this.position[0] === 3 && this.position[1] === 5) {
      this.square = 'f5';
    } else if (this.position[0] === 4 && this.position[1] === 5) {
      this.square = 'f4';
    } else if (this.position[0] === 5 && this.position[1] === 5) {
      this.square = 'f3';
    } else if (this.position[0] === 6 && this.position[1] === 5) {
      this.square = 'f2';
    } else if (this.position[0] === 7 && this.position[1] === 5) {
      this.square = 'f1';
    } else if (this.position[0] === 0 && this.position[1] === 6) {
      this.square = 'g8';
    } else if (this.position[0] === 1 && this.position[1] === 6) {
      this.square = 'g7';
    } else if (this.position[0] === 2 && this.position[1] === 6) {
      this.square = 'g6';
    } else if (this.position[0] === 3 && this.position[1] === 6) {
      this.square = 'g5';
    } else if (this.position[0] === 4 && this.position[1] === 6) {
      this.square = 'g4';
    } else if (this.position[0] === 5 && this.position[1] === 6) {
      this.square = 'g3';
    } else if (this.position[0] === 6 && this.position[1] === 6) {
      this.square = 'g2';
    } else if (this.position[0] === 7 && this.position[1] === 6) {
      this.square = 'g1';
    } else if (this.position[0] === 0 && this.position[1] === 7) {
      this.square = 'h8';
    } else if (this.position[0] === 1 && this.position[1] === 7) {
      this.square = 'h7';
    } else if (this.position[0] === 2 && this.position[1] === 7) {
      this.square = 'h6';
    } else if (this.position[0] === 3 && this.position[1] === 7) {
      this.square = 'h5';
    } else if (this.position[0] === 4 && this.position[1] === 7) {
      this.square = 'h4';
    } else if (this.position[0] === 5 && this.position[1] === 7) {
      this.square = 'h3';
    } else if (this.position[0] === 6 && this.position[1] === 7) {
      this.square = 'h2';
    } else if (this.position[0] === 7 && this.position[1] === 7) {
      this.square = 'h1';
    } else {
      console.log('unknown position', [this.position[0], this.position[1]]);
    }

  }
}
