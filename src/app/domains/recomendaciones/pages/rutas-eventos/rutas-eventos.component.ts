import { Component,OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../../../shared/components/header/header.component'

@Component({
  selector: 'app-rutas-eventos',
  standalone: true,
  imports: [TranslateModule,CommonModule,ReactiveFormsModule,HeaderComponent],
  templateUrl: './rutas-eventos.component.html',
  styleUrl: './rutas-eventos.component.css'
})
export class RutasEventosComponent implements OnInit {
  buscarForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) {
  }

  ngOnInit() {
    
    this.buscarForm = this.formBuilder.group({
      ciudades: ['',[Validators.required]],
      fecha_prevista: ['',[Validators.required]]
    });
}
}