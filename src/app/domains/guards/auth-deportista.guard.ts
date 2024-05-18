import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

export const authDeportistaGuard: CanActivateFn = (route, state) => {
  const autservice = inject(AuthService);
  const router = inject(Router);
  if(autservice.isSignedIn() && autservice.isDeportista()){
    return true;
  }
  else{
   const urlTreeReturn = router.createUrlTree(['/unauthorized']);
   return urlTreeReturn; 
  }
};
