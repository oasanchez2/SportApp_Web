import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment.development';
import { CalendarioEventos } from './calendarioEventos';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = /*environment.*/baseUrl + 'calendarioEventos.json';
  constructor(private http: HttpClient) { }

  getCourses(): Observable<CalendarioEventos[]> {
    return this.http.get<CalendarioEventos[]>(this.apiUrl);
  }

}
