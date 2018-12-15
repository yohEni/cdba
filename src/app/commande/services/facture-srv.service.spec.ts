import { TestBed } from '@angular/core/testing';

import { FactureSrvService } from './facture-srv.service';

describe('FactureSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactureSrvService = TestBed.get(FactureSrvService);
    expect(service).toBeTruthy();
  });
});
