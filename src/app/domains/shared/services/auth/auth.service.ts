import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

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
      expires: expireIn // Establecer la caducidad según la vida útil del token
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
    return !!this.cookieService.get('name');
  }

  getName(): string {
    return this.cookieService.get('name');
  }

}
