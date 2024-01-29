import { TestBed } from '@angular/core/testing';

import { OnlineGameBoardService } from './online-game-board.service';

describe('OnlineGameBoardService', () => {
  let service: OnlineGameBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineGameBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
