import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const autservice = inject(AuthService);
  const router = inject(Router);
  if(autservice.isSignedIn()){
    if(autservice.isDeportista()){
      const urlHomeDeportista = router.createUrlTree(['/home-deportista']);
      return urlHomeDeportista;
    }else if(autservice.isSocio()){ 
      const urlHomeSocio = router.createUrlTree(['/home-socio']);
      return urlHomeSocio;    
    }
    return true;
  }
  else{
   return true 
  }
};
