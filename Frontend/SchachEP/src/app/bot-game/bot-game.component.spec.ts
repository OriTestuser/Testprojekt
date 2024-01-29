import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotGameComponent } from './bot-game.component';

describe('BotGameComponent', () => {
  let component: BotGameComponent;
  let fixture: ComponentFixture<BotGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotGameComponent]
    });
    fixture = TestBed.createComponent(BotGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
