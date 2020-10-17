import { TestBed } from '@angular/core/testing';

import { RestaurantCartService } from './restaurant-cart.service';

describe('RestaurantCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantCartService = TestBed.get(RestaurantCartService);
    expect(service).toBeTruthy();
  });
});
