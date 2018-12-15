import { TestBed } from '@angular/core/testing';

import { StatutSrvService } from './statut-srv.service';

describe('StatutSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatutSrvService = TestBed.get(StatutSrvService);
    expect(service).toBeTruthy();
  });
});
