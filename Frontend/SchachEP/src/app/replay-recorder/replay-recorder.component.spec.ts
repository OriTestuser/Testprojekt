import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayRecorderComponent } from './replay-recorder.component';

describe('ReplayRecorderComponent', () => {
  let component: ReplayRecorderComponent;
  let fixture: ComponentFixture<ReplayRecorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplayRecorderComponent]
    });
    fixture = TestBed.createComponent(ReplayRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
