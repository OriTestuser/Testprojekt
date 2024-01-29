import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayPieceComponent } from './replay-piece.component';

describe('ReplayPieceComponent', () => {
  let component: ReplayPieceComponent;
  let fixture: ComponentFixture<ReplayPieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplayPieceComponent]
    });
    fixture = TestBed.createComponent(ReplayPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
