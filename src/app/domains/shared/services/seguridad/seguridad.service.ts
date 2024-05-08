import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';
import { LoginModel, LoginResult, DesafioMFAModel, VerifyMFAModel } from '../../models/login.model';
import { RegistrarModel, RegistrarResult  } from '../../models/registrar.model';
import { ConfirmarRegistroModel, ConfirmarRegistroResultModel } from '../../models/confirmar_registro.model';

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
  
  postConfirmarRegistroUsuario(confirmar: ConfirmarRegistroModel): Observable<ConfirmarRegistroResultModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<ConfirmarRegistroResultModel>(this.urlApi+"/confirmar-registro", confirmar , { headers });
  }

  postloginUsuario(loginModel: LoginModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<any>(this.urlApi+"/login", loginModel , { headers });
  }
  
  postDesafioMFA(desafioMFA: DesafioMFAModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<any>(this.urlApi+"/desafio-mfa", desafioMFA , { headers });
  }

  postVerifyMFA(verifyMFA: VerifyMFAModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<any>(this.urlApi+"/verify-mfa", verifyMFA , { headers });
  }
}