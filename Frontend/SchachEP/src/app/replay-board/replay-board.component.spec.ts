import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayBoardComponent } from './replay-board.component';

describe('ReplayBoardComponent', () => {
  let component: ReplayBoardComponent;
  let fixture: ComponentFixture<ReplayBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplayBoardComponent]
    });
    fixture = TestBed.createComponent(ReplayBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
