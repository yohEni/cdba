import { TestBed } from '@angular/core/testing';

import { LigneCommandeSrvService } from './ligne-commande-srv.service';

describe('LigneCommandeSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LigneCommandeSrvService = TestBed.get(LigneCommandeSrvService);
    expect(service).toBeTruthy();
  });
});
