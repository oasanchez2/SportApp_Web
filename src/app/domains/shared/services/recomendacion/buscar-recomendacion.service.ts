import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';
import { RecomendacionesBuscarJson, Recomendaciones } from '../../models/buscar_recomendaciones.model';

@Injectable({
  providedIn: 'root'
})
export class BuscarRecomendacionService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_EVENTOS;
  private urlApi= this.apiUrl  + "/recomendar";

  constructor() { }

  postBuscarRecomendaciones(entrenamiento: RecomendacionesBuscarJson): Observable<Recomendaciones[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Recomendaciones[]>(this.urlApi, entrenamiento, { headers });
  }
}
