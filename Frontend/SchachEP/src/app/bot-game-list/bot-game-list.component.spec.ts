import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotGameListComponent } from './bot-game-list.component';

describe('BotGameListComponent', () => {
  let component: BotGameListComponent;
  let fixture: ComponentFixture<BotGameListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotGameListComponent]
    });
    fixture = TestBed.createComponent(BotGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
