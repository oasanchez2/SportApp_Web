import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-deportista',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref,TranslateModule],
  templateUrl: './home-deportista.component.html',
  styleUrl: './home-deportista.component.css'
})
export class HomeDeportistaComponent {
  
  constructor(
    private translate: TranslateService
  ) {}
}
