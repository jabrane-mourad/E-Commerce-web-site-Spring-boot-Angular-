import { TestBed } from '@angular/core/testing';

import { MonthsYearsService } from './months-years.service';

describe('MonthsYearsService', () => {
  let service: MonthsYearsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthsYearsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
