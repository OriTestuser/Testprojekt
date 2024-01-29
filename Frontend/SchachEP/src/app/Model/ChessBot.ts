import {User} from './User'

export class ChessBot{
  chessBotId:number|undefined;

  player:User|undefined;

  chessGameName:string|undefined;

  timerUser:number|undefined;

  started:boolean|undefined;

  finished:boolean|undefined;

  playerInGame:boolean|undefined;

  boardState:string|undefined;

  level:number|undefined; // 1, 2 oder 3

  turn:number|undefined;  // 0 -> User, 1 -> Bot

  winner:string|undefined;

  timeStamp:string|undefined;

  startOfGame:Date|undefined;

moveList:string[]|undefined;

constructor() {
  this.chessBotId=-1;
  this.chessGameName='';
  this.started=false;
  this.playerInGame=false;
  this.startOfGame=new Date();
  this.timerUser=-1;
  this.finished=false;
  this.turn=-1;
  this.boardState='';
  this.winner='';
  this.player=new User();
  this.level=-1;
  this.moveList=[];
  this.timeStamp='';
}
}
