import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';
import { DeportistaEventoJson } from '../../models/eventos.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_EVENTOS;
  private urlApi= this.apiUrl  + "/user/";

  constructor() { }

  getEventosDeportista(id_usuario: string): Observable<DeportistaEventoJson[]> {
    return this.http.get<DeportistaEventoJson[]>(this.urlApi+id_usuario);
  }
}
