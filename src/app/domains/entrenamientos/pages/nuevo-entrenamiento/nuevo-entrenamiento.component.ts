import { Component,OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../../../shared/components/header/header.component'
import { EjerciciosService } from './../../../shared/services/ejercicio/ejercicios.service'
import { Ejercicios } from '../../../shared/models/ejercicios.model';
import { EjercicioComponent } from '../../components/ejercicio/ejercicio.component'

@Component({
  selector: 'app-nuevo-entrenamiento',
  standalone: true,
  imports: [TranslateModule,CommonModule,ReactiveFormsModule,HeaderComponent, EjercicioComponent],
  templateUrl: './nuevo-entrenamiento.component.html',
  styleUrl: './nuevo-entrenamiento.component.css'
})
export class NuevoEntrenamientoComponent implements OnInit  {
  companyForm: any;

  botonAgregarEjercicio: boolean = true;

  private ejercicioService = inject(EjerciciosService)
  ejercicios = signal<Ejercicios[]>([]);
  ejerciciosSeleccionados = signal<Ejercicios[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) {
  }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      nombre: ['', [Validators.required, this.alphanumeric]],
      fecha_entrenamiento: ['',[Validators.required]],
      ejercicios: ['', [Validators.required]],
      numero_repeticiones: ['', [Validators.required, this.numeric]],
    });

    this.ejercicioService.getEjercicios()
    .subscribe({
      next: (ejercicios) => {
        this.ejercicios.set(ejercicios);
      },
      error: () => {

      }
    })

    // Observa los cambios en los campos relevantes y actualiza la propiedad del botón
    this.companyForm.get('ejercicios').valueChanges.subscribe(() => {
      this.actualizarEstadoBoton();
    });
    this.companyForm.get('numero_repeticiones').valueChanges.subscribe(() => {
      this.actualizarEstadoBoton();
    });
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
  
  
  

}
