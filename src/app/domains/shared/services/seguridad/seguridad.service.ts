import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';
import { LoginModel, LoginResult } from '../../models/login.model';
import { RegistrarModel, RegistrarResult  } from '../../models/registrar.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_SECURITY;
  private urlApi= this.apiUrl;

  constructor() { }

  postRegistrarUsuario(registrarModel: RegistrarModel): Observable<RegistrarResult> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<RegistrarResult>(this.urlApi+"/register", registrarModel , { headers });
  } 

  postloginUsuario(loginModel: LoginModel): Observable<LoginResult> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<LoginResult>(this.urlApi+"/login", loginModel , { headers });
  }
}
