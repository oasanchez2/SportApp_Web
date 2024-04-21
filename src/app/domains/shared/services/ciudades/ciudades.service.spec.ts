import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CiudadesService } from './ciudades.service';
import { Ciudades } from '../../models/ciudades.model';
import { environment } from '../../../../../environments/environment';  // Assuming environment is mocked

describe('CiudadesService', () => {
  let service: CiudadesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiudadesService],
    });
    service = TestBed.inject(CiudadesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding expectations
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCiudades should make a GET request to the correct URL', () => {
    const expectedUrl = environment.URL_CIUDADES;

    service.getCiudades().subscribe();

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
  });

  it('getCiudades should return the expected data on success', () => {
    const expectedData: Ciudades[] = [{c_digo_dane_del_municipio: 15238,municipio:"Duitama",c_digo_dane_del_departamento:15,
    departamento: "Boyacá",region:"Región Centro Oriente"
     }];

    service.getCiudades().subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(environment.URL_CIUDADES);
    req.flush(expectedData); // Simulate a successful response
  });

  it('getCiudades should handle errors correctly', () => {
    const expectedError = new Error('Simulated error');

    service.getCiudades().subscribe(
      () => fail('Expected an error'),
      error => {
        expect(error).toEqual(expectedError);
      }
    );

    const req = httpTestingController.expectOne(environment.URL_CIUDADES);
    req.flush(expectedError, { status: 500, statusText: 'Server Error' });
  });
});
