import { Injectable } from '@angular/core';
import { BoardService } from "./board.service";
import { GameStateService } from "./game-state.service";

@Injectable({
  providedIn: 'root'
})
export class RulesEngineService {
  public onSelect:Boolean = false;
  public selectPiecePosition: number[] = [9, 9];
  constructor(private boardService: BoardService,
              private gameStateService: GameStateService,
              ) { }
  trySelect(position: number[]){
    console.log(this.boardService.boardData[1]);
    if(!this.onSelect){
      if(this.canSelect(position)){
        this.selectPiecePosition = position;
        this.onSelect = true;
        this.boardService.boardData[1][position[0]][position[1]] = 'true';
        console.log('onSelect = ', this.onSelect,'selectPiecePosition = ', this.selectPiecePosition);
        return 'Success';
        //No pieces selected.
        //Click on your own chess piece.
      }
      else{
        return 'Cant';
        //No pieces selected.
        //Click on someone else's chess piece.
        //Or there is no chess piece on the clicked grid.
      }
    }
    else{
      if(position == this.selectPiecePosition){
        this.selectPiecePosition = [9, 9];
        this.onSelect = false;
        console.log('onSelect = ', this.onSelect,'selectPiecePosition = ', this.selectPiecePosition);
        this.boardService.setAllisSelectedFalse();
        return 'Cancel';
        //Already selected your own piece but clicked on it again.
      }
      else {
        if(this.canSelect(position)){
          this.selectPiecePosition = position;
          this.boardService.setAllisSelectedFalse();
          this.boardService.boardData[1][position[0]][position[1]] = 'true';
          console.log('onSelect = ', this.onSelect,'selectPiecePosition = ', this.selectPiecePosition);
          return 'Success';
          //Own chess piece selected but clicked on another own chess piece
        }
        else{
          if(this.canMove(position)){
            console.log('onSelect = ', this.onSelect,'selectPiecePosition = ', this.selectPiecePosition);
            this.boardService.setAllisSelectedFalse();
            return 'Move';
            //You have selected your chess piece and click on the movement route
          }
          else{
            this.selectPiecePosition = [9, 9];
            this.onSelect = false;
            this.boardService.setAllisSelectedFalse();
            return 'Cancel';
            //You have selected your own piece but clicked on a position that cannot be moved.
          }
        }
      }
    }
  }
  canMove(position: number[]){
    return this.boardService.boardData[2][position[0]][position[1]] == 'true';
  }
  canSelect(position: number[]){
    console.log('gameStateService.isMyTurn() = ', this.gameStateService.isMyTurn());
    console.log('boardService.turnData = ', this.boardService.turnData);
    console.log('this.boardService.boardData[0][position[0]][position[1]] = ', this.boardService.boardData[0][position[0]][position[1]]);
    return (this.gameStateService.isMyTurn() &&
        this.boardService.turnData == 'w' &&
        this.boardService.boardData[0][position[0]][position[1]].includes('White')) ||
      (this.gameStateService.isMyTurn() &&
        this.boardService.turnData == 'b' &&
        this.boardService.boardData[0][position[0]][position[1]].includes('Black'));
  }
  setSelect(){
    if(this.selectPiecePosition[0] != 9 && this.selectPiecePosition[1] != 9)
    this.boardService.boardData[1][this.selectPiecePosition[0]][this.selectPiecePosition[1]] = 'true';
  }
}
