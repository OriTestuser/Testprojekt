import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineGamePieceComponent } from './online-game-piece.component';

describe('OnlineGamePieceComponent', () => {
  let component: OnlineGamePieceComponent;
  let fixture: ComponentFixture<OnlineGamePieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineGamePieceComponent]
    });
    fixture = TestBed.createComponent(OnlineGamePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
