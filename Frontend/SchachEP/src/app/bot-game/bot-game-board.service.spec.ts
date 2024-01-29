import { TestBed } from '@angular/core/testing';

import { BotGameBoardService } from './bot-game-board.service';

describe('BotGameBoardService', () => {
  let service: BotGameBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotGameBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
