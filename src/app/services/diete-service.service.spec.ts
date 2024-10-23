import { TestBed } from '@angular/core/testing';

import { DieteServiceService } from './diete-service.service';

describe('DieteServiceService', () => {
  let service: DieteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DieteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
