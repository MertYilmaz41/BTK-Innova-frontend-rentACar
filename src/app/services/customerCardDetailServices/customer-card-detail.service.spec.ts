import { TestBed } from '@angular/core/testing';

import { CustomerCardDetailService } from './customer-card-detail.service';

describe('CustomerCardDetailService', () => {
  let service: CustomerCardDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCardDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
