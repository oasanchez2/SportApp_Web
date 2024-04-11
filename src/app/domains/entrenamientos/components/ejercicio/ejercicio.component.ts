import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Ejercicios } from '../../../shared/models/ejercicios.model';

@Component({
  selector: 'app-ejercicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ejercicio.component.html',
  styleUrl: './ejercicio.component.css'
})
export class EjercicioComponent {
  @Input({required: true}) ejercicio!: Ejercicios;

}
