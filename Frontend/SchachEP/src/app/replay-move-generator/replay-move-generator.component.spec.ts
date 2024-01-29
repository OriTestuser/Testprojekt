import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayMoveGeneratorComponent } from './replay-move-generator.component';

describe('ReplayMoveGeneratorComponent', () => {
  let component: ReplayMoveGeneratorComponent;
  let fixture: ComponentFixture<ReplayMoveGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplayMoveGeneratorComponent]
    });
    fixture = TestBed.createComponent(ReplayMoveGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
