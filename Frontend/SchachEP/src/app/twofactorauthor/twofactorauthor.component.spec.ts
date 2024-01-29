import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofactorauthorComponent } from './twofactorauthor.component';

describe('TwofactorauthorComponent', () => {
  let component: TwofactorauthorComponent;
  let fixture: ComponentFixture<TwofactorauthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwofactorauthorComponent]
    });
    fixture = TestBed.createComponent(TwofactorauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
