import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ChangeDetectorRef} from '@angular/core';
import {OnlineGameStateService} from "../online-game/online-game-state.service";
import {OnlineGameBoardService} from "../online-game/online-game-board.service";
import  {  Chess  }  from  'chess.js'

@Component({
  selector: 'app-online-game-piece',
  templateUrl: './online-game-piece.component.html',
  styleUrls: ['./online-game-piece.component.css']
})
export class OnlineGamePieceComponent implements OnInit{
  @Input() type: string = '';
  @Input() position: number[] = [0, 0];
  @Input() isSelected: boolean = false;
  @Input() canMove: boolean = false;

  private stateCode: number = -1;
  private intervalId: any;
  public picLink: string = 'assets/chess-piece/Space.png';

  constructor(private router: Router,
              private stateService: OnlineGameStateService,
              private boardService: OnlineGameBoardService,
              private cdr: ChangeDetectorRef){ }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.stateCode = this.stateService.getState();
        switch(this.stateCode)
        {
          case -1:
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
              this.stateService.resetChange(this.position[0], this.position[1])
              this.cdr.detectChanges();//Data updates
            }
            break;
        }
    }, 10000);
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
}
