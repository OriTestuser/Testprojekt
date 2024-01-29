import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseOpponentComponent } from './choose-opponent.component';

describe('ChooseOpponentComponent', () => {
  let component: ChooseOpponentComponent;
  let fixture: ComponentFixture<ChooseOpponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseOpponentComponent]
    });
    fixture = TestBed.createComponent(ChooseOpponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
