import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService,TranslateModule } from '@ngx-translate/core'; 
import { NavInvitadoComponent } from '../../../shared/components/nav-invitado/nav-invitado.component';

@Component({
  selector: 'app-invitado',
  standalone: true,
  imports: [CommonModule, TranslateModule,NavInvitadoComponent],
  templateUrl: './invitado.component.html',
  styleUrl: './invitado.component.css'
})
export class InvitadoComponent {
  
  constructor(
    private translate: TranslateService
 ) {}
}
