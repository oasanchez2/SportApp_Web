import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';
import { Notificaciones } from '../../models/notificaciones.model';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_NOTIFICACIONES;
  private urlApi= this.apiUrl;

  constructor() { }

  getNotificacionesDeportista(id_usuario: string): Observable<Notificaciones[]> {
    return this.http.get<Notificaciones[]>(this.urlApi+"/user/"+id_usuario);
  }
}
