import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Entrenamientos, EntrenamientoJson } from '../../models/entrenamientos.model';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EntrenamientosService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_EJERCICIOS;
  private urlApi= this.apiUrl+'/ejercicios';

  constructor() { }

  getEntrenamientos() {
    return this.http.get<Entrenamientos[]>(this.urlApi);
  }

  postEntrenamiento(entrenamiento: EntrenamientoJson): Observable<Entrenamientos> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Entrenamientos>(this.urlApi, entrenamiento, { headers });
  }
  

}
