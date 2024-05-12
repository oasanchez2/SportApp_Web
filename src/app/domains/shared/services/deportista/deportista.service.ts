import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';
import { RegistrarDeportistaModel } from '../../models/registrar-deportista.model';

@Injectable({
  providedIn: 'root'
})
export class DeportistaService {

  private http = inject(HttpClient);
  apiUrl = environment.URL_DEPORTISTA;
  private urlApi= this.apiUrl;

  constructor() { }

  postRegistrarDeportista(registrarModel: RegistrarDeportistaModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<any>(this.urlApi, registrarModel , { headers });
  }

  getDeportista(id_deportista: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + id_deportista);
    return this.http.get<any>(this.urlApi+"/"+id_deportista, { headers });
  }
}
