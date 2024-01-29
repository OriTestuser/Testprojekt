import { Component } from '@angular/core';
import { LiveSeriveService} from "../Service/live-serive.service";
import {ChessGame} from "../Model/ChessGame";
import {ChessgameServiceService} from "../Service/chessgame-service.service";

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent {
  streamList:ChessGame[]=[];
  constructor(private liveService:LiveSeriveService,
              private chessGameService:ChessgameServiceService) {
}
ngOnInit(){
    this.showStreams();
}
  showStreams(){
    this.liveService.showStreams().subscribe((response=>{
      this.streamList=response;
      console.log(this.streamList);
    }),
      error => {console.log('error')})

    }
    navigateToLive(chessGameId:number){
    this.liveService.liveId=chessGameId;
      this.chessGameService.GameSetting.chessGameId=chessGameId
    }
  }
