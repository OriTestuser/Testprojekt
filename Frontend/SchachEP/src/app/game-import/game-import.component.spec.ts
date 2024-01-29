import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameImportComponent } from './game-import.component';

describe('GameImportComponent', () => {
  let component: GameImportComponent;
  let fixture: ComponentFixture<GameImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameImportComponent]
    });
    fixture = TestBed.createComponent(GameImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
