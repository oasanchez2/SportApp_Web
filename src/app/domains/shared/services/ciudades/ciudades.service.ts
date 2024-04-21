import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Ciudades } from '../../models/ciudades.model';
import { environment } from '../../.././../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_CIUDADES;
  private urlApi= this.apiUrl;

  constructor() { }

  getCiudades() {
    return this.http.get<Ciudades[]>(this.urlApi);
  }
}
