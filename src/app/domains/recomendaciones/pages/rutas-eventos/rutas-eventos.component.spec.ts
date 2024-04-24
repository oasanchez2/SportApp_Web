import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RutasEventosComponent } from './rutas-eventos.component';
import { BuscarRecomendacionService } from '../../../shared/services/recomendacion/buscar-recomendacion.service'; 

describe('RutasEventosComponent', () => {
  let component: RutasEventosComponent;
  let fixture: ComponentFixture<RutasEventosComponent>;
  let buscarRecomendacionService: BuscarRecomendacionService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutasEventosComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: BuscarRecomendacionService, useValue: jasmine.createSpyObj('BuscarRecomendacionService', ['postBuscarRecomendaciones']) },
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['error', 'info']) },
      ]
    })
    .compileComponents();

    buscarRecomendacionService = TestBed.inject(BuscarRecomendacionService);
    toastrService = TestBed.inject(ToastrService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create busqueda object correctly', () => {
    component.buscarForm.setValue({ciudades: 'Test City', fecha_prevista: '2022-12-31'});
    const busqueda = {
      ciudad: component.buscarForm.get('ciudades').value,
      fecha_prevista: component.buscarForm.value.fecha_prevista
    };
    expect(busqueda).toEqual({ciudad: 'Test City', fecha_prevista: '2022-12-31'});
  });
});