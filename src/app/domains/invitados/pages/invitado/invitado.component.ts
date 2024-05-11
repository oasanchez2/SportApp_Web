import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService,TranslateModule } from '@ngx-translate/core'; 


@Component({
  selector: 'app-invitado',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './invitado.component.html',
  styleUrl: './invitado.component.css'
})
export class InvitadoComponent {
  
  constructor(
    private translate: TranslateService
 ) {}
}
