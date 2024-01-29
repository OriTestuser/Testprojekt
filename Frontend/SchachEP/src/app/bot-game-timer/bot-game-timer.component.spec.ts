import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotGameTimerComponent } from './bot-game-timer.component';

describe('BotGameTimerComponent', () => {
  let component: BotGameTimerComponent;
  let fixture: ComponentFixture<BotGameTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotGameTimerComponent]
    });
    fixture = TestBed.createComponent(BotGameTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
