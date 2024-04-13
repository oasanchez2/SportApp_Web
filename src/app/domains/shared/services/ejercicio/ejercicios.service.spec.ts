import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EjerciciosService } from './ejercicios.service';
import { environment } from '../../.././../../environments/environment'
import { Ejercicios } from '../../models/ejercicios.model';

describe('EjerciciosService', () => {
  let service: EjerciciosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EjerciciosService]
    });
    service = TestBed.inject(EjerciciosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have apiUrl defined', () => {
    expect(service.apiUrl).toBeDefined();
    expect(service.apiUrl).toEqual(environment.URL_EJERCICIOS);
  });

  it('should get ejercicios', () => {
    const mockData : Ejercicios[] =  [
      {
        id_ejercicio: '1',
        nombre: 'Flexiones de brazos',
        estado: true,
        url_imagen: 'https://ejemplo.com/imagen.jpg',
        numero_repeticiones: 10
      },
      {
        id_ejercicio: '2',
        nombre: 'Sentadillas',
        estado: false,
        url_imagen: 'https://ejemplo.com/imagen2.jpg',
        numero_repeticiones: 15
      }
    ];
    service.getEjercicios().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
