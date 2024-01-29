import { TestBed } from '@angular/core/testing';

import { ChesspuzzleServiceService } from './chesspuzzle-service.service';

describe('ChesspuzzleServiceService', () => {
  let service: ChesspuzzleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChesspuzzleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
