import { TestBed } from '@angular/core/testing';

import { FashionService } from './fashion.service';

describe('FashionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FashionService = TestBed.get(FashionService);
    expect(service).toBeTruthy();
  });
});
