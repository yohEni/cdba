import { TestBed } from '@angular/core/testing';

import { CommandeSrvService } from './commande-srv.service';

describe('CommandeSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandeSrvService = TestBed.get(CommandeSrvService);
    expect(service).toBeTruthy();
  });
});
