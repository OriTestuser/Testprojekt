import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMatchesComponent } from './open-matches.component';

describe('OpenMatchesComponent', () => {
  let component: OpenMatchesComponent;
  let fixture: ComponentFixture<OpenMatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenMatchesComponent]
    });
    fixture = TestBed.createComponent(OpenMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
