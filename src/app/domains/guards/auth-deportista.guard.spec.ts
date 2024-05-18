import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authDeportistaGuard } from './auth-deportista.guard';

describe('authDeportistaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authDeportistaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
