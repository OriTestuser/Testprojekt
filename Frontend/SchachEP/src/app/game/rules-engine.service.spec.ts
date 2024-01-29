import { TestBed } from '@angular/core/testing';

import { RulesEngineService } from './rules-engine.service';

describe('RulesEngineService', () => {
  let service: RulesEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
