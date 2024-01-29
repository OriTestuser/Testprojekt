import { TestBed } from '@angular/core/testing';

import { PuzzleDataService } from './puzzle-data.service';

describe('PuzzleDataService', () => {
  let service: PuzzleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
