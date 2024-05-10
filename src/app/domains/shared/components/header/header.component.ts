import { Component, OnInit } from '@angular/core';
import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule,CommonModule,RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  langs: String [] = [];

  constructor(
    private translate: TranslateService
 ) {}

 changeLang (lang :string){
  this.translate.use(lang)
}

ngOnInit(): void {
  this.langs = this.translate.getLangs();
}

}
