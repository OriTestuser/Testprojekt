import { TestBed } from '@angular/core/testing';

import { ImportPGNService } from './import-pgn.service';

describe('ImportPGNService', () => {
  let service: ImportPGNService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportPGNService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
