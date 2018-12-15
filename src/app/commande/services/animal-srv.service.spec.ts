import { TestBed } from '@angular/core/testing';

import { AnimalSrvService } from './animal-srv.service';

describe('AnimalSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimalSrvService = TestBed.get(AnimalSrvService);
    expect(service).toBeTruthy();
  });
});
