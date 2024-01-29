import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PuzzleDataService } from "./puzzle-data.service";
import {ChesspuzzleServiceService} from "../Service/chesspuzzle-service.service";
import {PuzzleRulesEigineService} from "./puzzle-rules-eigine.service";

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent {
  puzzleList :string[][] = [];
  constructor(
    private router: Router,
    public puzzleDataService: PuzzleDataService,
    private chesspuzzleServiceService: ChesspuzzleServiceService,
    private puzzleRulesEigineService: PuzzleRulesEigineService,
  ) {}

  ngOnInit(){
    this.chesspuzzleServiceService.getData().subscribe(
      (response) =>{
        console.log(response);
        for (const puzzle of response) {
          const puzzleId = puzzle[0].toString();
          const FEN = puzzle[1].toString();
          const moves = puzzle[2].toString();
          console.log(puzzleId,FEN,moves);
          this.puzzleList.push([puzzleId,FEN,moves]);
        }
      },
      (error) =>{
        alert("Fail to get Data");
        // handling errors
        console.error('Ein Fehler ist aufgetreten:', error);
      }
    );
  }
  startGame(puzzleData: string[]) {
    // Navigate to puzzle-game component and pass puzzleData
    this.puzzleDataService.playPuzzleData = puzzleData;
    this.router.navigate(['/puzzleGame'] );
  }
}
