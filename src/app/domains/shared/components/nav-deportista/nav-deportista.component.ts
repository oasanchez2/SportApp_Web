import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-nav-deportista',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterLinkWithHref],
  templateUrl: './nav-deportista.component.html',
  styleUrl: './nav-deportista.component.css'
})
export class NavDeportistaComponent {

  constructor(private translate: TranslateService
  ){ }

}
