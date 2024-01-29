import { TestBed } from '@angular/core/testing';

import { PuzzleRulesEigineService } from './puzzle-rules-eigine.service';

describe('PuzzleRulesEigineService', () => {
  let service: PuzzleRulesEigineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleRulesEigineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
