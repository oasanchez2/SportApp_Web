import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Ejercicios } from '../../models/ejercicios.model';
import { environment } from '../../.././../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_EJERCICIOS;
  private urlApi= this.apiUrl;

  constructor() { }

  getEjercicios() {
    return this.http.get<Ejercicios[]>(this.urlApi);
  }
}
