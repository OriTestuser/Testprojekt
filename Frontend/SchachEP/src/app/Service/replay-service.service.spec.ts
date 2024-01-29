import { TestBed } from '@angular/core/testing';

import { ReplayServiceService } from './replay-service.service';

describe('ReplayServiceService', () => {
  let service: ReplayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
