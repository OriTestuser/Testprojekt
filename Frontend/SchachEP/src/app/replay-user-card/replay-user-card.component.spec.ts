import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayUserCardComponent } from './replay-user-card.component';

describe('ReplayUserCardComponent', () => {
  let component: ReplayUserCardComponent;
  let fixture: ComponentFixture<ReplayUserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplayUserCardComponent]
    });
    fixture = TestBed.createComponent(ReplayUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
