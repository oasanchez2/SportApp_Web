import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BuscarRecomendacionService } from './buscar-recomendacion.service';
import { RecomendacionesBuscarJson, Recomendaciones } from '../../models/buscar_recomendaciones.model';
import { environment } from '../../../../../environments/environment';

describe('BuscarRecomendacionService', () => {
  let service: BuscarRecomendacionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuscarRecomendacionService],
    });
    service = TestBed.inject(BuscarRecomendacionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding expectations
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('postBuscarRecomendaciones should make a POST request to the correct URL', () => {
    const mockEntrenamiento: RecomendacionesBuscarJson = { ciudad: "Duitama", fecha_prevista: new Date(2024,9,10,0,0,0,0) };
    const expectedUrl = environment.URL_EVENTOS + '/recomendar';

    service.postBuscarRecomendaciones(mockEntrenamiento).subscribe();

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
  });

  it('postBuscarRecomendaciones should set the correct headers', () => {
    const mockEntrenamiento: RecomendacionesBuscarJson = { ciudad: "Duitama", fecha_prevista: new Date(2024,9,10,0,0,0,0)  };
    const expectedHeaders = { 'Content-Type': 'application/json' };

    service.postBuscarRecomendaciones(mockEntrenamiento).subscribe();

    const req = httpTestingController.expectOne(environment.URL_EVENTOS + '/recomendar');
    expect(req.request.headers.getAll('Content-Type')).toEqual([expectedHeaders['Content-Type']]);
  });

  it('postBuscarRecomendaciones should return the expected data on success', () => {
    const mockEntrenamiento: RecomendacionesBuscarJson = { ciudad: "Duitama", fecha_prevista: new Date(2024,9,10,0,0,0,0)  };
    const expectedData: Recomendaciones[] = [{ nombre:"vuelta aal tolima",lugar:"Honda", fecha_evento: new Date(2024,9,10,0,0,0,0),
           nivel:"AVANZADO",descripcion:"Carrera de ciclomontañismo  profesional en tierras Tolimenses" }];

    service.postBuscarRecomendaciones(mockEntrenamiento).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(environment.URL_EVENTOS + '/recomendar');
    req.flush(expectedData); // Simulate a successful response
  });

  it('postBuscarRecomendaciones should handle errors correctly', () => {
    const mockEntrenamiento: RecomendacionesBuscarJson = { ciudad: "Duitama", fecha_prevista: new Date(2024,9,10,0,0,0,0) };
    const expectedError = new Error('Simulated error');

    service.postBuscarRecomendaciones(mockEntrenamiento).subscribe(
      () => fail('Expected an error'),
      error => {
        expect(error).toEqual(expectedError);
      }
    );

    const req = httpTestingController.expectOne(environment.URL_EVENTOS + '/recomendar');
    req.flush(expectedError, { status: 500, statusText: 'Server Error' });
  });
});
