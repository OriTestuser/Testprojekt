import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotGameSettingComponent } from './bot-game-setting.component';

describe('BotGameSettingComponent', () => {
  let component: BotGameSettingComponent;
  let fixture: ComponentFixture<BotGameSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotGameSettingComponent]
    });
    fixture = TestBed.createComponent(BotGameSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
