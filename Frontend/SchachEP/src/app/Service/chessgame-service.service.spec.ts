import { TestBed } from '@angular/core/testing';

import { ChessgameServiceService } from './chessgame-service.service';

describe('ChessgameServiceService', () => {
  let service: ChessgameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessgameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
