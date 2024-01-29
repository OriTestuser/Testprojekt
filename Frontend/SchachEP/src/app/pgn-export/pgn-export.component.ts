import  {Component, EventEmitter} from '@angular/core';
import {Chess} from "chess.js";
import {ReplayServiceService} from "../Service/replay-service.service";
import {ImportPGNService} from "../Service/import-pgn.service";


@Component({
  selector: 'app-pgn-export',
  templateUrl: './pgn-export.component.html',
  styleUrls: ['./pgn-export.component.css']
})
export class PgnExportComponent {
  pgnImported = new EventEmitter<string>();
  importedPgn: string = '';
  listPgn:string[]=[];
  moves:any[]=[];
  constructor(public replayService:ReplayServiceService,
              public importPgnService:ImportPGNService) {
  }
ngOnInit(){
    this.importPgnService.listPgn().subscribe((response)=>{
    this.listPgn=response;
    this.importPgnService.listPGN=response;
    console.log("response",response);
    console.log("listPgn",this.listPgn);
},(error)=>{
      alert("error to get listPgn")
    })}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.importedPgn = e.target.result;
        this.pgnImported.emit(this.importedPgn);
        this.replayService.getGameName(this.importedPgn);
      };

      reader.readAsText(file);
    }

  }


  uploadPGN() {
    this.replayService.getGameName(this.importedPgn);
    this.importPgnService.importPGN(this.importedPgn).subscribe((response)=>{
      this.importPgnService.listPgn().subscribe((response)=>{
        this.listPgn=response;
        console.log('list',response)
      },(error)=>{alert("error to get list")});
      console.log(this.listPgn);
      console.log(response);
    },(error)=>{alert('importPGN error')})

}
watchReplay(pgn:string){
    this.replayService.pgn=pgn;
}
}
