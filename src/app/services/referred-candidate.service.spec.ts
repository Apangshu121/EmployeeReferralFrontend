import { TestBed } from '@angular/core/testing';

import { ReferredCandidateService } from './referred-candidate.service';

describe('ReferredCandidateService', () => {
  let service: ReferredCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferredCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
