import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainlobbyComponent } from './mainlobby.component';

describe('MainlobbyComponent', () => {
  let component: MainlobbyComponent;
  let fixture: ComponentFixture<MainlobbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainlobbyComponent]
    });
    fixture = TestBed.createComponent(MainlobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
