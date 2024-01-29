import {User} from './User'
export class ChessGame{
  chessGameId : number;

  user1 : User|undefined;
  //The person who sent the invitation.
  user2 : User|undefined;
  //The person receiving the invitation.

  chessGameName : string|undefined;
  timer : number|undefined;

  accepted : boolean|undefined;
  //shows whether an invitation has been accepted or not yet answered
  started : boolean|undefined;
  //shows whether an accepted game has been started
  finished : boolean|undefined;
  //shows whether a game that has started has been finished

  insideGameUser1 : boolean|undefined;
  insideGameUser2 : boolean|undefined;
  //shows whether I'm currently playing the game
  livestreamActive : boolean|undefined;
  timeStamp:string|undefined;
  winner:User|undefined

  constructor(){
    this.chessGameId = -1;
    this.user1 = undefined;
    this.user2 = undefined;
    //Set default value
    this.chessGameName = 'New Game';
    this.timer = 999;
    this.accepted = false;
    this.started = false;
    this.finished = false;
    this.insideGameUser1 = false;
    this.insideGameUser2 = false;
    this.livestreamActive=false;
    this.timeStamp='';
    this.winner = undefined;
  }

  setChessGameName(newName : string){
    this.chessGameName = newName;
  }

  getChessGameName(){
    return this.chessGameName + '';
  }

  setTimer(newTimer : number){
    this.timer = newTimer;
  }

  getTimer(){
    if(this.timer!=undefined)
      return this.timer;
    return -1;
  }

  getChessGameId(){
    if(this.chessGameId != undefined)
      return this.chessGameId;
    return -1;

  }

  getUserId1(){
    if(this.user1 != undefined)
      return this.user1.id;
    return -1;

  }

  getUserId2(){
    if(this.user2 != undefined)
      return this.user2.id;
    return -1;
  }

  setUser1(newUser1 : User){
    this.user1 = newUser1;
  }

  setUser2(newUser2 : User){
    this.user2 = newUser2;
  }

}
