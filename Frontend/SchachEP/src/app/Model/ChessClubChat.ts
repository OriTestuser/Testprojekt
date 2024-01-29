import {User} from "./User";
import {Message} from "./Message";
import {ChessClub} from "./ChessClub";

export class ChessClubChat{
 chessClub:ChessClub|undefined;
 sender:User|undefined;
 membersOfChessClub:User[]|undefined;
 messages :Message[]|undefined;
  chatName:string|undefined;
constructor() {
  this.chatName=undefined;
  this.sender=undefined;
  this.membersOfChessClub=undefined;
  this.messages=undefined;
  this.chessClub=undefined;
}
}
