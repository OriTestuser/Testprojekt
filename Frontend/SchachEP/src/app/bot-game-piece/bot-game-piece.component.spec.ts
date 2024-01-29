import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotGamePieceComponent } from './bot-game-piece.component';

describe('BotGamePieceComponent', () => {
  let component: BotGamePieceComponent;
  let fixture: ComponentFixture<BotGamePieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotGamePieceComponent]
    });
    fixture = TestBed.createComponent(BotGamePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
