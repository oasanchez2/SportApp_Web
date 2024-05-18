import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Rol } from '../../models/enums.model';
import { co } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cookieService = inject(CookieService);
 

  constructor() {
  }

  signIn(accessToken: string,idToken: string, refreshToken: string, expireIn: number): void {
    this.cookieService.set('accessToken', accessToken, {
      secure: true, // Solo enviar cookie sobre HTTPS
      expires: expireIn, // Establecer la caducidad según la vida útil del token
    });
    this.cookieService.set('idToken', idToken, {
      secure: true,
      expires: expireIn
    });
    this.cookieService.set('refreshToken', refreshToken, {
      secure: true,
      expires: expireIn
    });
  }

  isSignedIn(): boolean {
    console.log('accessToken: ' + this.cookieService.get('accessToken'));
    console.log(!!this.cookieService.get('accessToken'));
    return !!this.cookieService.get('accessToken');
  }

  getAccessToken(): string {
    return this.cookieService.get('accessToken');
  }

  getIdToken(): string {
    return this.cookieService.get('idToken');
  }

  getRefreshToken(): string {
    return this.cookieService.get('refreshToken');
  }

  isDeportista(): boolean {
    const rolUser: string = sessionStorage.getItem('rol') ?? '';
    console.log(rolUser);
    console.log(rolUser === Rol.Deportista);
    return rolUser === Rol.Deportista;    
  }

  isSocio(): boolean {
    const rolUser: string = sessionStorage.getItem('rol') ?? '';
    console.log(rolUser);  
    console.log(rolUser === Rol.Socio);
    return rolUser === Rol.Socio;
  }

}
