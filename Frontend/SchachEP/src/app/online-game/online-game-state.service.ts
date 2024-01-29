import { Injectable } from '@angular/core';
import  {  Chess  }  from  'chess.js'

@Injectable({
  providedIn: 'root'
})
export class OnlineGameStateService {

  constructor() { }

  state: number = -1;
  clickQueue: number[][] = [];
  pieceToChange: boolean[][] = [];

  pointToChange: boolean = false;
  //After requested help, change this variable to 'true';

  resetState(): void {
    console.log('Reset game state to 99');
    this.state = 99;
  }

  setState(newState: number): void {
    console.log('Change the game state to ', newState);
    this.state = newState;
  }

  getState(): number {
    return this.state;
  }

  setClick(x: number, y: number): void {
    // Store numbers at the end of the queue
    this.clickQueue.push([x, y]);
    console.log('User clicked ', x, y, '\nclickQueue: ', this.clickQueue);
  }

  getClick(): number[]{
    const nextClick = this.clickQueue.shift();
    //Removes the first element of an array and returns the value of that element
    if (nextClick == undefined) {
      console.log('Try to get Click but the clickQueue is empty');
      return [99,99]; // If the queue is empty, returns [99,99]
    }
    else{
      console.log('Get nextClick: ', nextClick);
      return nextClick;
    }
  }

  clearClick(){
    console.log('Clean the clickQueue');
    this.clickQueue = [];
  }

  resetPiece(){
    console.log('Reset pieceToChange all true');
    for(let i = 0; i <= 7; i++)
    {
      this.pieceToChange[i] = [];
      for(let j = 0; j <= 7; j++){
        this.pieceToChange[i][j] = true;
      }
    }
  }

  canChange(x :number, y:number){
    console.log('Check whether the chess pieces located at ', x, ' and ', y, ' need to be changed: ', this.pieceToChange[x][y]);
    if(this.pieceToChange[x][y]){
      this.pieceToChange[x][y] = false;
      return true;
    }
    else return  false;
  }

  resetChange(x :number, y:number){
    console.log('Set pieceToChange[', x, '][', y,'] = false');
    return this.pieceToChange[x][y] = false;
  }
}
