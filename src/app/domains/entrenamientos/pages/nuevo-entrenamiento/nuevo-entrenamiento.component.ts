import { Component,OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './../../../shared/components/header/header.component'
import { EjerciciosService } from './../../../shared/services/ejercicio/ejercicios.service'
import { Ejercicios } from '../../../shared/models/ejercicios.model';
import { Entrenamientos, EntrenamientoJson } from '../../../shared/models/entrenamientos.model';
import { EjercicioComponent } from '../../components/ejercicio/ejercicio.component';
import { EntrenamientosService } from './../../../shared/services/entrenamiento/entrenamientos.service';
import { validateHeaderName } from 'http';

@Component({
  selector: 'app-nuevo-entrenamiento',
  standalone: true,
  imports: [TranslateModule,CommonModule, DatePipe, ReactiveFormsModule,HeaderComponent, EjercicioComponent],
  templateUrl: './nuevo-entrenamiento.component.html',
  styleUrl: './nuevo-entrenamiento.component.css'
})
export class NuevoEntrenamientoComponent implements OnInit  {
  companyForm: any;

  botonAgregarEjercicio: boolean = true;

  private ejercicioService = inject(EjerciciosService);
  private entrenamientoService = inject(EntrenamientosService);
 
  ejercicios = signal<Ejercicios[]>([]);
  ejerciciosSeleccionados = signal<Ejercicios[]>([]);

  public fechaMinima:Date= new Date();
  public fechaMaxima:Date= new Date();

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) {
  }

  ngOnInit() {
        
    this.fechaMinima = new Date();
    const unAnioDespues = new Date();
    unAnioDespues.setFullYear(new Date().getFullYear() + 1);
    this.fechaMaxima = unAnioDespues;

    this.companyForm = this.formBuilder.group({
      nombre: ['', [Validators.required, this.alphanumeric]],
      fecha_entrenamiento: ['',[Validators.required, this.fechaValida]],  
      ejercicios: [''],
      numero_repeticiones: ['',[this.numeric]],
    });

    this.getEjerciciosLista();

    // Observa los cambios en los campos relevantes y actualiza la propiedad del botón
    this.companyForm.get('ejercicios').valueChanges.subscribe(() => {
      this.actualizarEstadoBoton();
    });
    this.companyForm.get('numero_repeticiones').valueChanges.subscribe(() => {
      this.actualizarEstadoBoton();
    });
  }

  getEjerciciosLista(){
    this.ejercicioService.getEjercicios()
    .subscribe({
      next: (ejercicios) => {
        this.ejercicios.set(ejercicios);
      },
      error: () => {

      }
    })
  }
  
  alphanumeric(control: FormControl) {
    const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;
    const value = control.value;
    const isValid = alphanumericRegex.test(value);
    return isValid ? null : { 'alphanumeric': true };
  }

  alphabetical(control: FormControl) {
    const alphabeticalRegex = /^[a-zA-Z ]*$/;
    const value = control.value;
    const isValid = alphabeticalRegex.test(value);
    return isValid ? null : { 'alphabetical': true };
  }

  numeric(control: FormControl) {
    const numericRegex = /^[0-9]*$/;
    const value = control.value;
    const isValid = numericRegex.test(value);
    return isValid ? null : { 'numeric': true };
  }

  fechaValida(control: FormControl): { [key: string]: any } | null {    
    var partes = control.value.split('-');
    const dia = parseInt(partes[2], 10);
    const mes = parseInt(partes[1], 10) - 1; // Los meses en JavaScript son base 0
    const anio = parseInt(partes[0], 10);
    const fechaSeleccionada = new Date(anio, mes, dia,0,0,0,0); 
    const fechaActual = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),0,0,0,0);
    
    // Validar que la fecha no sea menor a la fecha actual
    if (fechaSeleccionada < fechaActual) {
      return { 'fechaPasada': true };
    }
  
    // Validar que la fecha no sea mayor a un año desde la fecha actual
    const unAnioDespues = new Date();
    unAnioDespues.setHours(0, 0, 0, 0);
    unAnioDespues.setFullYear(fechaActual.getFullYear() + 1);
    if (fechaSeleccionada > unAnioDespues) {
      return { 'fechaFutura': true };
    }
  
    return null;
  }
  
  // Función para verificar las condiciones y actualizar el estado del botón
  private actualizarEstadoBoton(): void {
    const numeroRepeticiones = this.companyForm.get('numero_repeticiones').value;
    const ejercicioSeleccionado = this.companyForm.get('ejercicios').value;
    const ejerciciosValidos = this.companyForm.get('ejercicios').valid;
    const numeroRepeticionesValido = this.companyForm.get('numero_repeticiones').valid;
    this.botonAgregarEjercicio = !(numeroRepeticiones && ejercicioSeleccionado && ejerciciosValidos && numeroRepeticionesValido);
  }
  
// Método para buscar y mover un ejercicio a la nueva array
anadirEjercicio(): void {
  const numeroRepeticiones = this.companyForm.get('numero_repeticiones').value;
  const ejercicioSeleccionado = this.companyForm.get('ejercicios').value;
  const ejercicioEncontrado = this.ejercicios().find(ejercicio => ejercicio.id_ejercicio === ejercicioSeleccionado);

  if (ejercicioEncontrado) {
    ejercicioEncontrado.numero_repeticiones = numeroRepeticiones;
    this.ejerciciosSeleccionados().push(ejercicioEncontrado);
    this.companyForm.get('ejercicios').reset('');
    this.companyForm.get('numero_repeticiones').reset('');
    const ejerciciosFiltrados = this.ejercicios().filter(ejercicio => ejercicio.id_ejercicio !== ejercicioEncontrado.id_ejercicio);
    this.ejercicios.set(ejerciciosFiltrados); // Actualizar la señal con los ejercicios filtrados
  } else {
    console.error('No se encontró ningún ejercicio con el id proporcionado.');
  }
}
crearEntrenamiento(): void{
  if (this.companyForm.invalid) {
    this.toastr.error("Error", "Por favor, revise los campos")
    return;
  }else{
    if(this.ejerciciosSeleccionados().length > 0){
      const nuevoEntrenamiento: EntrenamientoJson = {
        nombre: this.companyForm.value.nombre,
        fecha_entrenamiento: this.companyForm.value.fecha_entrenamiento,
        id_usuario: '07adc016-82eb-4c92-b722-0e80ebfdcfe5',
        estado: true,
        ejercicios: this.ejerciciosSeleccionados()
      };
      
      this.entrenamientoService.postEntrenamiento(nuevoEntrenamiento).subscribe(
        (respuesta: Entrenamientos) => {
          // Manejar la respuesta exitosa
          // La respuesta ahora está disponible como un objeto `Entrenamiento`
          console.log('Entrenamiento creado:', respuesta);
          // Después de guardar los datos, resetea el formulario
          this.companyForm.reset();
          this.ejerciciosSeleccionados.set([]);
          this.getEjerciciosLista();
          this.toastr.success("Ok", "El entrenamiento creado correctamente!") 
        },
        (error) => {
          // Manejar el error
          if (error.status == 412){
            this.toastr.error("Error", "E entrenamiento ya existe")
          }
          else{
            this.toastr.error("Error", "Ha ocurrido un error")
            console.log(error);
          }
        }
      );
      
    }
    else{
      this.toastr.error("Error", "Debe Seleccionar almenos un ejercicio!")
    }
  }
}

}
