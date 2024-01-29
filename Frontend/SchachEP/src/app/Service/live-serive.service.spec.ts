import { TestBed } from '@angular/core/testing';

import { LiveSeriveService } from './live-serive.service';

describe('LiveSeriveService', () => {
  let service: LiveSeriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveSeriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
