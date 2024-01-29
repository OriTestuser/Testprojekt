import { TestBed } from '@angular/core/testing';

import { BotGameStateService } from './bot-game-state.service';

describe('BotGameStateService', () => {
  let service: BotGameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotGameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
