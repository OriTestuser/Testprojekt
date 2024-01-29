import { TestBed } from '@angular/core/testing';

import { MoveGeneratorService } from './move-generator.service';

describe('MoveGeneratorService', () => {
  let service: MoveGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
