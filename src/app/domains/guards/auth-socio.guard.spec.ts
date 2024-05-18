import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authSocioGuard } from './auth-socio.guard';

describe('authSocioGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authSocioGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
