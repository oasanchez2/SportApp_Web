import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-socio',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref,TranslateModule],
  templateUrl: './home-socio.component.html',
  styleUrl: './home-socio.component.css'
})
export class HomeSocioComponent{

  constructor(
    private translate: TranslateService
  ) {}

}
