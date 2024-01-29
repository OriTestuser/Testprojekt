import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-replay-piece',
  templateUrl: './replay-piece.component.html',
  styleUrls: ['./replay-piece.component.css']
})
export class ReplayPieceComponent {
  @Input() type: string = "Space";
  @Input() position: number[] = [0, 0];
  @Input() isSelected: boolean = false;
  movedPiece(){
  }
}
