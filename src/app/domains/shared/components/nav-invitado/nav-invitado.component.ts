import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-nav-invitado',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterLinkWithHref],
  templateUrl: './nav-invitado.component.html',
  styleUrl: './nav-invitado.component.css'
})
export class NavInvitadoComponent {
  
  
  constructor(private translate: TranslateService
){ }

}
