import {ChangeDetectorRef, Component} from '@angular/core';
import  {  Chess  }  from  'chess.js'
import {ChessBotServiceService} from "../Service/chess-bot-service.service";
import {BotGameBoardService} from "./bot-game-board.service";
import {BotGameStateService} from "./bot-game-state.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-bot-game',
  templateUrl: './bot-game.component.html',
  styleUrls: ['./bot-game.component.css']
})
export class BotGameComponent {
  constructor(private chessBotService: ChessBotServiceService,
              private boardService: BotGameBoardService,
              private stateService: BotGameStateService,
              private router: Router,
              private cdr: ChangeDetectorRef,
  ) { }
  stateCode: number = -1;
  assistantMessage: string = '';
  private intervalId: any;
  moveStr: string = '';
  public timer: number = this.boardService.timer;

  ngOnInit(){
    console.log('Get in the bot game with GameID: ', this.boardService.gameID);
    this.timer = this.boardService.timer;
    this.boardService.resetAll();
    this.boardService.fenToBoard(this.boardService.defaultFEN);
    this.stateService.setState(0);
    this.stateService.clearClick();


    this.intervalId = setInterval(() => {
      this.stateCode = this.stateService.getState();
      switch(this.stateCode)
      {
        case -1:
          break;
        case 0:
          const click0 = this.stateService.getClick();
          if(click0[1] != 99 && click0[0] != 99){
            if(this.boardService.canSelect(click0[0], click0[1])){
              this.stateService.setState(10);
              this.boardService.setOnSelect(click0[0], click0[1]);
              this.boardService.resetCanMove();
              this.boardService.setCanMove();
              this.boardService.resetSpecial();
            }
            else{
              this.boardService.resetOnSelect();
              this.boardService.resetCanMove();
              this.boardService.resetSpecial();
            }
          }
          break;
        case 10:
          const click10 = this.stateService.getClick();
          if(click10[1] != 99 && click10[0] != 99){
            if(this.boardService.checkCanMove(click10[0], click10[1])){
              this.stateService.setState(30);
              this.moveStr = this.boardService.moveToStr(click10[0], click10[1]);
              this.makeMove(click10[0], click10[1]);
              this.boardService.resetOnSelect();
              this.boardService.resetCanMove();
              this.boardService.resetSpecial();

            }
            else{
              this.boardService.resetOnSelect();
              this.boardService.resetCanMove();
              this.boardService.resetSpecial();
              this.stateService.setState(0);
            }
          }
          break;
        case 30:
          break;
        case 40:
          this.stateService.setState(41);
          this.botMove();
          break;
        case 41:
          break;
        case 99:
          console.log('Game end!');
          clearInterval(this.intervalId);
          break;
        default:
          console.log('Unknow State Code!');
          clearInterval(this.intervalId);
            //this.cdr.detectChanges();//Data updates
          break;
      }
    }, 100);

  }
  botMove(){
    console.log('Try To Get Bot Move');
    if(this.boardService.gameID)
      this.chessBotService.botMove(this.boardService.gameID).subscribe(
        (response) =>{
          if(response){
            console.log('botMove:',response);
            this.boardService.chess.move(response?.bestMove.toString());
            this.boardService.resetAll();
            this.stateService.setState(0);
            console.log('Move data get successfully');
          }
          else{
            console.log('Failed to get bot move data');
          }
        },
        (error) =>{
          // handling errors
          console.log('Error On Bot Move');
          console.error('Ein Fehler ist aufgetreten：', error);
        }
      );
  }
  makeMove(row: number, col: number){
    console.log('Try To Make Move to :',row, col);

    const moveSAN = this.boardService.chess.move(this.moveStr).san;
    this.boardService.resetAll();

    if(this.boardService.gameID)
    this.chessBotService.makeMove(this.boardService.gameID, this.moveStr).subscribe(
      (response) =>{
        if(response){
          this.stateService.setState(40);
          console.log('Move data sent successfully');
        }
        else{
          console.log('Failed to send move data');
        }
      },
      (error) =>{
        // handling errors
        console.log('Error On Make Move');
        console.error('Ein Fehler ist aufgetreten：', error);
      }
    );

    if(this.boardService.gameID)
    this.chessBotService.sendSAN(this.boardService.gameID, moveSAN).subscribe(
      (response) =>{
        console.log('/send SAN successfully');
      },
      (error) =>{
        console.error('Ein Fehler ist aufgetreten：', error);
        // handling errors
      }
    );

  }
  getChessCellBackground(row: number, col: number): string {
    if ((row + col) % 2 === 0) {
      return '../../assets/chess-piece/BGI_White.png';
    } else {
      return '../../assets/chess-piece/BGI_Black.png';
    }
  }
  stopGame(){
    if(this.boardService.gameID)
      this.chessBotService.updateTimer(this.boardService.remainingTime,this.boardService.gameID).subscribe(
        (response) =>{
          console.log('updateTimer: ', response);
        },
        (error) =>{
          // handling errors
          alert("ERROR");
          console.error('Ein Fehler ist aufgetreten：', error);
        }
      );

    if(this.boardService.gameID)
    this.chessBotService.leaveGame(this.boardService.gameID).subscribe(
    (response) =>{
      if(response){
        this.stateService.setState(99);
        console.log('Go To MainLobby');
        this.router.navigate(['/mainLobby']);

      }
      else{
        console.log('Cant Stop Game');
      }
    },
      (error) =>{
        // handling errors
        console.log('Error On Stop Game');
        console.error('Ein Fehler ist aufgetreten：', error);
      }
    );
  }
  assistant(){
    this.boardService.resetCanMove();
    this.boardService.resetOnSelect();

    // this.canGetAssistant = false;
    if(this.boardService.gameID)
    this.chessBotService.assistant(this.boardService.gameID).subscribe(
      (response) => {
        console.log('Erfolgreich Hilfe erhalten: ', response);
        this.assistantMessage = response?.bestMove;
        if (this.assistantMessage.length === 4) {
          const startColumn = this.assistantMessage[0].charCodeAt(0) - 'a'.charCodeAt(0);
          const startRow = 8 - parseInt(this.assistantMessage[1], 10);

          const endColumn = this.assistantMessage[2].charCodeAt(0) - 'a'.charCodeAt(0);
          const endRow = 8 - parseInt(this.assistantMessage[3], 10);

          if (this.isWithinBounds(startRow, startColumn) && this.isWithinBounds(endRow, endColumn)) {
            this.boardService.specialSquare[startRow][startColumn] = true;
            this.boardService.specialSquare[endRow][endColumn] = true;
            this.stateService.setChange(startRow, startColumn);
            this.stateService.setChange(endRow, endColumn);
          }
        }
        this.stateService.setState(0);
        },
      (error) =>{
        // handling errors
        console.error('Ein Fehler ist aufgetreten：', error);
      }
    );
  }
  isWithinBounds(row: number, column: number): boolean {
    return row >= 0 && row < 8 &&
      column >= 0 && column < 8;
  }
}
