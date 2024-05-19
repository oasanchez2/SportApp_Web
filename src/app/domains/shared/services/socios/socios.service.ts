import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../.././../../environments/environment'
import { Observable } from 'rxjs';
import { ProductoServicio, ProductoServicioJson } from '../../models/producto-servicio.model';
import { RegistrarSocioModel } from '../../models/registrar-socio.model';


@Injectable({
  providedIn: 'root'
})
export class SociosService {
  private http = inject(HttpClient);
  apiUrl = environment.URL_SOCIOS;
  private urlApi= this.apiUrl;

  constructor() { }

  postRegistrarSocio(registrarModel: RegistrarSocioModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<any>(this.urlApi, registrarModel , { headers });
  }

  postProductoServicio(productoServicio: ProductoServicioJson): Observable<ProductoServicio> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<ProductoServicio>(this.urlApi + "/producto-servicio", productoServicio, { headers });
  }

  getSocio(idSocio: string): Observable<RegistrarSocioModel> {
    return this.http.get<RegistrarSocioModel>(this.urlApi + '/' + idSocio);
  }

  getDeportista(id_deportista: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + id_deportista);
    return this.http.get<any>(this.urlApi+"/"+id_deportista, { headers });
  }
}
