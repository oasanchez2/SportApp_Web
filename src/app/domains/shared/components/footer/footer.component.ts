import { Component } from '@angular/core';
import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../.././../../environments/environment'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  version = environment.VERSION;
}
