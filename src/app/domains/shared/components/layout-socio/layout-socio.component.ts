import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HeaderDeportistaComponent } from '../header-deportista/header-deportista.component';
import { FooterComponent } from './../../../shared/components/footer/footer.component'
import { RouterModule } from '@angular/router';
import { NavSocioComponent } from '../nav-socio/nav-socio.component';

@Component({
  selector: 'app-layout-socio',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderDeportistaComponent,FooterComponent, NavSocioComponent],
  templateUrl: './layout-socio.component.html',
  styleUrl: './layout-socio.component.css'
})
export class LayoutSocioComponent {

}
