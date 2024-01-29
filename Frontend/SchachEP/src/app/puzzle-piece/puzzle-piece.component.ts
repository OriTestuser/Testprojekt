import {Component, Input} from '@angular/core';
import {PuzzleRulesEigineService} from "../puzzle/puzzle-rules-eigine.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-puzzle-piece',
  templateUrl: './puzzle-piece.component.html',
  styleUrls: ['./puzzle-piece.component.css']
})
export class PuzzlePieceComponent {
  @Input() type: string = "Space";
  @Input() position: number[] = [0, 0];
  @Input() isSelected: boolean = false;
  @Input() canMove: boolean = false;
  constructor(private puzzleRulesEigineService: PuzzleRulesEigineService,
              private router: Router,){ }
  selectPiece(){
    console.log('click :', this.position);
    if((!this.puzzleRulesEigineService.selectPiece(this.position[0],this.position[1])))
    {
      alert('Falsche Bewegung');
      console.log('reset game');
      this.puzzleRulesEigineService.resetGame();
      //If user make the wrong move, start the puzzle again
    }
  }
}
