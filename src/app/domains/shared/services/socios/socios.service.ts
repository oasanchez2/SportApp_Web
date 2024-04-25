import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';
import { ProductoServicio, ProductoServicioJson } from '../../models/producto-servicio.model';


@Injectable({
  providedIn: 'root'
})
export class SociosService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_SOCIOS;
  private urlApi= this.apiUrl;

  constructor() { }

  postEntrenamiento(productoServicio: ProductoServicioJson): Observable<ProductoServicio> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<ProductoServicio>(this.urlApi, productoServicio, { headers });
  }
}
