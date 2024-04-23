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
  apiUrl = environment.URL_ENTRENAMIENTO;
  private urlApi= this.apiUrl;

  constructor() { }
  
  postEntrenamiento(entrenamiento: EntrenamientoJson): Observable<Entrenamientos> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Entrenamientos>(this.urlApi, entrenamiento, { headers });
  }
  
  getEntrenamientoDeportista(id_usuario: string): Observable<Entrenamientos[]> {
    return this.http.get<Entrenamientos[]>(this.urlApi+"/user/"+id_usuario);
  }

}
