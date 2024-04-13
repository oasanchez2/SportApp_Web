import { TestBed,inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EntrenamientosService } from './entrenamientos.service';
import { Entrenamientos, EntrenamientoJson } from '../../models/entrenamientos.model';
import { environment } from '../../.././../../environments/environment'

describe('EntrenamientosService', () => {
  let service: EntrenamientosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EntrenamientosService]
    });
    service = TestBed.inject(EntrenamientosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have apiUrl defined', () => {
    expect(service.apiUrl).toBeDefined();
    expect(service.apiUrl).toEqual(environment.URL_ENTRENAMIENTO);
  });

  it('should post entrenamiento', () => {
    const mockEntrenamiento: EntrenamientoJson = {
      nombre: 'Entrenamiento de ejemplo',
      fecha_entrenamiento: new Date('2024-04-12'),
      id_usuario: '12345',
      estado: true,
      ejercicios: []
    };

    service.postEntrenamiento(mockEntrenamiento).subscribe(data => {
      expect(data).toBeDefined(); // Verifica que la respuesta no sea nula
      // Aquí puedes agregar más expectativas según la respuesta esperada del servidor
      
    });

    const req = httpMock.expectOne(service.apiUrl); // Verifica que se haga una solicitud a la URL correcta
    expect(req.request.method).toBe('POST'); // Verifica que se haga una solicitud POST
    // Aquí podrías simular la respuesta del servidor utilizando req.flush() si lo necesitas
    req.flush({ status: 201 });
  });

  afterEach(() => {
    httpMock.verify();
  });

});
