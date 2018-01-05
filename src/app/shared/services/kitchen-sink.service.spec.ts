import { TestBed, inject } from '@angular/core/testing';

import { KitchenSinkService } from './kitchen-sink.service';

describe('KitchenSinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KitchenSinkService]
    });
  });

  it('should be created', inject([KitchenSinkService], (service: KitchenSinkService) => {
    expect(service).toBeTruthy();
  }));
});
