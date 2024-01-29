import { Component } from '@angular/core';
import { ReplayServiceService} from "../Service/replay-service.service";

@Component({
  selector: 'app-replay-recorder',
  templateUrl: './replay-recorder.component.html',
  styleUrls: ['./replay-recorder.component.css']
})
export class ReplayRecorderComponent {
constructor(public replayService:ReplayServiceService) {
}
}
