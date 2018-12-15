import { TestBed } from '@angular/core/testing';

import { ClientSrvService } from './client-srv.service';

describe('ClientSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientSrvService = TestBed.get(ClientSrvService);
    expect(service).toBeTruthy();
  });
});
