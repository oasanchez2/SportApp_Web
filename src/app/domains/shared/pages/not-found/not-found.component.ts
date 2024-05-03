import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { TranslateService,TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, TranslateModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
