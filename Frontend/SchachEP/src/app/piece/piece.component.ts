import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import { PlaychessgameServiceService } from "../Service/playchessgame-service.service";
import { RulesEngineService } from "../game/rules-engine.service";
import {MoveGeneratorService} from "../game/move-generator.service";
import {BoardService} from "../game/board.service";


@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent {
  @Input() type: string = "Space";
  @Input() position: number[] = [0, 0];
  @Input() isSelected: boolean = false;
  @Input() canMove: boolean = false;
  constructor(private router: Router,
              private playChessGameService: PlaychessgameServiceService,
              private ruleEngineService: RulesEngineService,
              private moveGeneratorService: MoveGeneratorService,
              private boardService: BoardService,){ }


  // When onSelect becomes false, reset isSelected of all components to false


  selectPiece() {
    console.log('Try to select the piece on', this.position);
    let canSelect:string;
    canSelect = this.ruleEngineService.trySelect(this.position);
    switch (canSelect) {
      case 'Success':{
        this.boardService.setAllCanMoveFalse();
        this.isSelected = true;
        this.moveGeneratorService.getLegalMove();
        console.log(this.type, 'were select!', this.position);
        break;
      }
      case 'Cancel':{
        this.boardService.setAllCanMoveFalse();
        console.log(this.type, 'were not select!', this.position);
        break;
      }
      case 'Cant':{
        console.log('This piece cannot be selected.', this.position);
        break;
      }
      case 'Move':{
        console.log('Try to move the piece from',this.ruleEngineService.selectPiecePosition, 'to', this.position);
        this.moveGeneratorService.creatMove(this.position);
        this.boardService.setAllCanMoveFalse();
        this.ruleEngineService.selectPiecePosition = [9, 9];
        this.ruleEngineService.onSelect = false;
        break;
      }
      default:console.log('An error occurred while checking whether the piece is selectable.', this.position);
    }
  }
}
