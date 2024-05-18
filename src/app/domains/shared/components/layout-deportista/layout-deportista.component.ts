import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HeaderDeportistaComponent } from '../header-deportista/header-deportista.component';
import { FooterComponent } from './../../../shared/components/footer/footer.component'
import { RouterModule } from '@angular/router';
import { NavDeportistaComponent } from '../nav-deportista/nav-deportista.component';

@Component({
  selector: 'app-layout-deportista',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderDeportistaComponent,FooterComponent, NavDeportistaComponent],
  templateUrl: './layout-deportista.component.html',
  styleUrl: './layout-deportista.component.css'
})
export class LayoutDeportistaComponent {

}
