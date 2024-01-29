import {Component, Input} from '@angular/core';
import {User} from "../Model/User";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() point: number = 0;
  @Input() color: string = '';
  constructor(
  ){}

}
