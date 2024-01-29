import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineGameUserCardComponent } from './online-game-user-card.component';

describe('OnlineGameUserCardComponent', () => {
  let component: OnlineGameUserCardComponent;
  let fixture: ComponentFixture<OnlineGameUserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineGameUserCardComponent]
    });
    fixture = TestBed.createComponent(OnlineGameUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
