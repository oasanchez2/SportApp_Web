import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';
import { LoginModel, LoginResult } from '../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_SECURITY;
  private urlApi= this.apiUrl;

  constructor() { }

  postloginUsuario(loginModel: LoginModel): Observable<LoginResult> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<LoginResult>(this.urlApi+"/login", loginModel , { headers });
  }
}
