import { User } from "./User";
import {ChessClubMembership} from "./ChessClubMembership";
import{ChessClubChat} from "./ChessClubChat";

export class ChessClub {
  id:number|undefined;
  chessClubName:string|undefined;
  chessClubChat:ChessClubChat|undefined
  constructor() {
    this.id=undefined;
    this.chessClubName=undefined;
    this.chessClubChat=undefined;
  }
}
