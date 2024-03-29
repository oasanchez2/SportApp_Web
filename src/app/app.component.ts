import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import  { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: '<router-outlet />'
})
export class AppComponent {
  langs: String [] = [];
  title = 'SportApp_Web';

  constructor(private translate: TranslateService){
    this.translate.setDefaultLang('español');
    this.translate.use ('español')
    this.translate.addLangs(['español','ingles'])

  }
}
