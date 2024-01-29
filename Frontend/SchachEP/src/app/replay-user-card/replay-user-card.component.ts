import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-replay-user-card',
  templateUrl: './replay-user-card.component.html',
  styleUrls: ['./replay-user-card.component.css']
})
export class ReplayUserCardComponent {
  @Input() Name: string = '';
  @Input() Points:string = '';
}
