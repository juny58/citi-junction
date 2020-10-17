import { TestBed } from '@angular/core/testing';

import { RestaurantDetailService } from './restaurant-detail.service';

describe('RestaurantDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantDetailService = TestBed.get(RestaurantDetailService);
    expect(service).toBeTruthy();
  });
});
