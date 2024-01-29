import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleUploaderComponent } from './puzzle-uploader.component';

describe('PuzzleUploaderComponent', () => {
  let component: PuzzleUploaderComponent;
  let fixture: ComponentFixture<PuzzleUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleUploaderComponent]
    });
    fixture = TestBed.createComponent(PuzzleUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
