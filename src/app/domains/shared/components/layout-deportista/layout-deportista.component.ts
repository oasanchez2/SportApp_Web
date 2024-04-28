import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HeaderDeportistaComponent } from '../header-deportista/header-deportista.component';
import { FooterComponent } from './../../../shared/components/footer/footer.component'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-deportista',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderDeportistaComponent,FooterComponent],
  templateUrl: './layout-deportista.component.html',
  styleUrl: './layout-deportista.component.css'
})
export class LayoutDeportistaComponent {

}
