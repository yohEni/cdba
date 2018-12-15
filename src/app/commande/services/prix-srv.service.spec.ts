import { TestBed } from '@angular/core/testing';

import { PrixSrvService } from './prix-srv.service';

describe('PrixSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrixSrvService = TestBed.get(PrixSrvService);
    expect(service).toBeTruthy();
  });
});
