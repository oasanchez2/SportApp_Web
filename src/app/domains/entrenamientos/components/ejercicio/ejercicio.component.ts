import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio',
  standalone: true,
  imports: [],
  templateUrl: './ejercicio.component.html',
  styleUrl: './ejercicio.component.css'
})
export class EjercicioComponent {
  img = 'https://picsum.photos/320/320?' + Math.random();
}
