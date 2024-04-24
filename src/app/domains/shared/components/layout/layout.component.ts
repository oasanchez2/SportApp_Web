import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HeaderComponent } from './../../../shared/components/header/header.component'
import { FooterComponent } from './../../../shared/components/footer/footer.component'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
