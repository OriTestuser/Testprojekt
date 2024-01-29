import { TestBed } from '@angular/core/testing';

import { FriendsServiceService } from './friends-service.service';

describe('FriendsServiceService', () => {
  let service: FriendsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
