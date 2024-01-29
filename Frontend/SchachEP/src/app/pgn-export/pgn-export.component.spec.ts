import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgnExportComponent } from './pgn-export.component';

describe('PgnExportComponent', () => {
  let component: PgnExportComponent;
  let fixture: ComponentFixture<PgnExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PgnExportComponent]
    });
    fixture = TestBed.createComponent(PgnExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
