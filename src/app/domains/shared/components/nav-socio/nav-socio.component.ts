import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-nav-socio',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterLinkWithHref],
  templateUrl: './nav-socio.component.html',
  styleUrl: './nav-socio.component.css'
})
export class NavSocioComponent {
  
  constructor(private translate: TranslateService
  ){ }

}
