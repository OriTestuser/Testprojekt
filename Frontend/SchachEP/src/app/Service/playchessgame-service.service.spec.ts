import { TestBed } from '@angular/core/testing';

import { PlaychessgameServiceService } from './playchessgame-service.service';

describe('PlaychessgameServiceService', () => {
  let service: PlaychessgameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaychessgameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
