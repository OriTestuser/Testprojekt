import { Component } from '@angular/core';
import { RefreshGuard } from'src/app/Service/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SchachEP';
  buttonClicked = false;
  constructor(private refreshGuard: RefreshGuard) {}


  hideTitle() {
    this.buttonClicked = true;
    this.refreshGuard.activate();
  }
}
