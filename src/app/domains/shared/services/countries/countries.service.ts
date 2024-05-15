import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Ciudades } from '../../models/ciudades.model';
import { Countries, States, Cities } from '../../models/countries.model';
import { environment } from '../../.././../../environments/environment'
import { Observable, of  } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private http = inject(HttpClient);
  private urlApi_Paises= environment.URL_PAISES;
  private urlApi_Estados= environment.URL_ESTADOS_PAISES;
  private urlApi_Ciudades= environment.URL_CIUDADES_ESTADOS;

  constructor() { }

  getPaises() {
    return this.http.get<Countries[]>(this.urlApi_Paises);
  }

  getCitiesForCountry(idPais: number): Observable<Cities[]> {
   const allCities: Cities[] = [];
   this.getStatesForCountry(idPais).subscribe(states => {
      states.forEach(state => {
        this.getCitiesForState(state).subscribe(cities => {
          allCities.push(...cities);
        });
      });
    });
    return of(allCities);
  }
  
  getStatesForCountry(idPais: number): Observable<States[]> {
    //const statesUrl = `https://oasanchez2.github.io/countries/json/states.json?id_country=${idPais}`;
    const statesUrl = `${this.urlApi_Estados}?id_country=${idPais}`;
    return this.http.get<States[]>(statesUrl);
  }

  getCitiesForState(state: States): Observable<Cities[]> {
    //const cityUrl = `https://oasanchez2.github.io/countries/json/cities.json?id_state=${state.id}`;
    const cityUrl = `${this.urlApi_Ciudades}?id_state=${state.id}`;
    return this.http.get<Cities[]>(cityUrl);
  }
  
  
}
