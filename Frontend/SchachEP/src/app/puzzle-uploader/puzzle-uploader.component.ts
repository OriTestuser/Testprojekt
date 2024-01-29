import { Component } from '@angular/core';
import {ChesspuzzleServiceService} from "../Service/chesspuzzle-service.service";
import {PuzzleDataService} from "../puzzle/puzzle-data.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../Service/user-service.service";

@Component({
  selector: 'app-puzzle-uploader',
  templateUrl: './puzzle-uploader.component.html',
  styleUrls: ['./puzzle-uploader.component.css']
})
export class PuzzleUploaderComponent {
  puzzlePath = '';
  sendToBackend: string[][] =[];

  constructor(private chessPuzzleServiceService: ChesspuzzleServiceService,
              private puzzleDataService: PuzzleDataService,
              private router: Router,
              private userService: UserServiceService,) {
  }
  uploadFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      this.puzzlePath = URL.createObjectURL(file);

      alert('Datei erfolgreich hochgeladen!');
      //File uploaded successfully!
      console.log('File path: ', this.puzzlePath);

      reader.onload = (e) => {
        const result :string = reader.result as string;
        //reader.result maybe string | ArrayBuffer | null

        console.log('File Content:', result);
        this.puzzleDataService.csvData = result;
        this.puzzleDataService.analysisCSV(result);

        this.sendToBackend = this.puzzleDataService.puzzleListForSend;
        this.sendPuzzleData();
      };

      reader.readAsText(file);

    } else {
      alert('Bitte wählen Sie eine CSV-Datei.');
      //Please choose a CSV file.
    }

  }

  sendPuzzleData(){
    console.log('the length of this.sendToBackend is :',this.sendToBackend.length);
    for(let i = 0; i < this.sendToBackend.length; i++)
    if(this.userService.UserData.id){
      this.chessPuzzleServiceService.importChessPuzzle(this.sendToBackend[i], this.userService.UserData.id).subscribe(
        (response) =>{
          console.log('/importChessPuzzle return: ', response);
          this.router.navigate(['/puzzle']);
        },
        (error) =>{
          alert("Fail to import ChessPuzzle");
          // handling errors
          console.error('Ein Fehler ist aufgetreten:', error);
          this.router.navigate(['/puzzle']);
        }
      );
    }
    else{
      this.router.navigate(['/puzzle']);
    }
  }

}
