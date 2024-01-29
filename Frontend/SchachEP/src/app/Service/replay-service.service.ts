import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ReplayServiceService {
public pgn:string='';

public Event:string='';
public Date:string='';
public Rounds:number=0;
public White:string='';
public Black:string='';
public moves:any[]=[];
  constructor() { }
  getGameName(pgn:string){
    const gameName = pgn.match(/\[Event "(.*?)"]/);
    const eventName = gameName ? gameName[1] : '';
    return eventName;
  }
  getPlayer1Name(pgn:string){
    const player1Name = pgn.match(/\[White "(.*?)"/);
    return player1Name ? player1Name[1] : '';
  }
  getPlayer2Name(pgn:string){
    const player2Name = pgn.match(/\[Black "(.*?)"/);
    return player2Name ? player2Name[1] : '';
  }
  getPlayer1Points(pgn:string){
const player1Points=pgn.match(/\[WhiteElo "(.*?)"]/);
  return player1Points ? player1Points[1] : '';
  }
  getPlayer2Points(pgn:string){
    const player2Points=pgn.match(/\[BlackElo "(.*?)"]/);
    return player2Points ? player2Points[1] : '';
  }
  getGameResult(pgn:string){
    const result = pgn.match(/\[Result "(.*?)"]/);
    return result ? result[1] : '';
  }
  getGameDate(pgn:string){
    const result = pgn.match((/\[Date "(.*?)"]/));
    return result ? result[1] : '';
  }
}
