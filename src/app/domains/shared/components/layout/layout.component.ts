import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HeaderComponent } from './../../../shared/components/header/header.component'
import { FooterComponent } from './../../../shared/components/footer/footer.component'
import { RouterModule } from '@angular/router';
import { NavInvitadoComponent } from '../../../shared/components/nav-invitado/nav-invitado.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderComponent,FooterComponent,NavInvitadoComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
