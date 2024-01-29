import { TestBed } from '@angular/core/testing';

import { ChessBotServiceService } from './chess-bot-service.service';

describe('ChessBotServiceService', () => {
  let service: ChessBotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessBotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
