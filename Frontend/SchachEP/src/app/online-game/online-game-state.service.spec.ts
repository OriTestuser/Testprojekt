import { TestBed } from '@angular/core/testing';

import { OnlineGameStateService } from './online-game-state.service';

describe('OnlineGameStateService', () => {
  let service: OnlineGameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineGameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
