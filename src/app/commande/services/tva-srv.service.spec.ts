import { TestBed } from '@angular/core/testing';

import { TvaSrvService } from './tva-srv.service';

describe('TvaSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TvaSrvService = TestBed.get(TvaSrvService);
    expect(service).toBeTruthy();
  });
});
