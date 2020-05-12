import { TestBed } from '@angular/core/testing';

import { FoodTrucksService } from './food-trucks.service';

describe('FoodTrucksService', () => {
  let service: FoodTrucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodTrucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
