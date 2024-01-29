import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlePieceComponent } from './puzzle-piece.component';

describe('PuzzlePieceComponent', () => {
  let component: PuzzlePieceComponent;
  let fixture: ComponentFixture<PuzzlePieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzlePieceComponent]
    });
    fixture = TestBed.createComponent(PuzzlePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
