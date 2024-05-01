import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-invitado',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './nav-invitado.component.html',
  styleUrl: './nav-invitado.component.css'
})
export class NavInvitadoComponent {
  
  
  constructor(private translate: TranslateService
){ }

}
