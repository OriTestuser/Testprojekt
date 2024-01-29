import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepbottomComponent } from './sepbottom.component';

describe('SepbottomComponent', () => {
  let component: SepbottomComponent;
  let fixture: ComponentFixture<SepbottomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SepbottomComponent]
    });
    fixture = TestBed.createComponent(SepbottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
