import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoEntrenamientoComponent } from './nuevo-entrenamiento.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { EjerciciosService } from '../../../shared/services/ejercicio/ejercicios.service';
import { EntrenamientosService } from '../../../shared/services/entrenamiento/entrenamientos.service';
import { of } from 'rxjs';
import { Ejercicios } from '../../../shared/models/ejercicios.model';
import { Entrenamientos } from '../../../shared/models/entrenamientos.model';

// Creamos un mock de ToastrService
class MockToastrService {
  success(message: string, title?: string) {}
  error(message: string, title?: string) {}
  // Define otros métodos necesarios para las pruebas si es necesario
}

describe('NuevoEntrenamientoComponent', () => {
  let component: NuevoEntrenamientoComponent;
  let fixture: ComponentFixture<NuevoEntrenamientoComponent>;
  let formBuilder: FormBuilder;
  let toastrService: ToastrService;
  let ejerciciosService: EjerciciosService;
  let entrenamientosService: EntrenamientosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(),NuevoEntrenamientoComponent,HttpClientModule],
      providers: [
        FormBuilder,
        EjerciciosService,
        EntrenamientosService,
        {provide:ToastrService,useClass: MockToastrService }
      ]
    })
    .compileComponents();
  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEntrenamientoComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    toastrService = TestBed.inject(ToastrService);
    ejerciciosService = TestBed.inject(EjerciciosService);
    entrenamientosService = TestBed.inject(EntrenamientosService);
    spyOn(ejerciciosService, 'getEjercicios').and.returnValue(of([
      { id_ejercicio: '1', nombre: 'Ejercicio 1', numero_repeticiones: 10, estado: true, url_imagen: 'https://picsum.photos/200/300?r=234' },
      // Agrega más ejercicios de prueba si es necesario
    ]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize companyForm with default values', () => {
    expect(component.companyForm).toBeDefined();
    expect(component.companyForm.get('nombre')).toBeDefined();
    expect(component.companyForm.get('fecha_entrenamiento')).toBeDefined();
    expect(component.companyForm.get('ejercicios')).toBeDefined();
    expect(component.companyForm.get('numero_repeticiones')).toBeDefined();
  });

  it('should validate nombre field required', () => {
    const nombreControl = component.companyForm.get('nombre');
    nombreControl.setValue('');
    expect(nombreControl.valid).toBeFalsy();
    expect(nombreControl.errors.required).toBeTruthy();
  });

  // More validation tests for other fields...

  it('should call getEjerciciosLista on initialization', () => {
    spyOn(component, 'getEjerciciosLista');
    component.ngOnInit();
    expect(component.getEjerciciosLista).toHaveBeenCalled();
  });

  
  it('should add ejercicio when anadirEjercicio is called', () => {
    const mockEjercicio: Ejercicios = { id_ejercicio: '1', nombre: 'Ejercicio 1', numero_repeticiones: 10, estado: true, url_imagen: 'https://picsum.photos/200/300?r=234'  };
    component.companyForm.get('ejercicios').setValue('1');
    component.companyForm.get('numero_repeticiones').setValue(10);
    spyOn(ejerciciosService, 'getEjercicios').and.returnValue(of([mockEjercicio]));
    spyOn(component.ejerciciosSeleccionados(), 'push');
    component.anadirEjercicio();
    expect(component.ejerciciosSeleccionados().push).toHaveBeenCalledWith(mockEjercicio);
  });
  
  it('should add ejercicio when anadirEjercicio is called', () => {
    // Inicializar el formulario con valores
    component.companyForm.patchValue({
      nombre: 'Nombre del Entrenamiento',
      fecha_entrenamiento: new Date(),
      ejercicios: '1', // Id del ejercicio
      numero_repeticiones: 10
    });
    // Llamar al método anadirEjercicio()
    component.anadirEjercicio();
    // Verificar que el ejercicio se haya añadido correctamente a ejerciciosSeleccionados
    expect(component.ejerciciosSeleccionados()[0]).toEqual(jasmine.objectContaining({
      id_ejercicio: '1',
      nombre: 'Ejercicio 1',
      numero_repeticiones: 10,
      estado: true,
      url_imagen: 'https://picsum.photos/200/300?r=234'
    }));
  });

  
  it('should reset companyForm and ejerciciosSeleccionados when entrenamiento is created', () => {
    const mockEntrenamiento: Entrenamientos = { id_entrenamiento: '1', nombre: 'Entrenamiento 1', 
                  fecha_entrenamiento: new Date('2024-04-30'),id_usuario: '07adc016-82eb-4c92-b722-0e80ebfdcfe5', 
                  estado: true};
    spyOn(entrenamientosService, 'postEntrenamiento').and.returnValue(of(mockEntrenamiento));
    spyOn(component.companyForm, 'reset');
    spyOn(component.ejerciciosSeleccionados, 'set');
    component.crearEntrenamiento();
    expect(component.companyForm.reset).toHaveBeenCalled();
    expect(component.ejerciciosSeleccionados.set).toHaveBeenCalledWith([]);
  });
  
  it('should reset companyForm and ejerciciosSeleccionados when entrenamiento is created', () => {
    // Simular valores en el formulario y en ejerciciosSeleccionados
    component.companyForm.patchValue({
      nombre: 'Nombre del Entrenamiento',
      fecha_entrenamiento: new Date(),
      ejercicios: '1', // Id del ejercicio
      numero_repeticiones: 10
    });
    component.ejerciciosSeleccionados.set([{ id_ejercicio: '1', nombre: 'Ejercicio 1', numero_repeticiones: 10, estado: true, url_imagen: 'https://picsum.photos/200/300?r=234' }]);
    
    // Llamar al método crearEntrenamiento()
    component.crearEntrenamiento();
    
    // Verificar que los métodos reset y set hayan sido llamados
    expect(component.companyForm.reset).toHaveBeenCalled();
    expect(component.ejerciciosSeleccionados.set).toHaveBeenCalledWith([]);
  });

});
