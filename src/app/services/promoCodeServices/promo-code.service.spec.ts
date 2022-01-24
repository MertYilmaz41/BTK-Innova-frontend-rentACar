import { TestBed } from '@angular/core/testing';

import { PromoCodeService } from './promo-code.service';

describe('PromoCodeService', () => {
  let service: PromoCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
