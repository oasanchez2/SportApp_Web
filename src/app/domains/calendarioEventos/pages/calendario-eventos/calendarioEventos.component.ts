import { Component,OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component'

import {CalendarioEventos} from './calendarioEventos'
import { dataCalendarioEventos } from './dataCalendarioEventos';

@Component({
  selector: 'app-calendario-eventos',/*Etiqueta que se usará para "invocar" el componente directamente sobre alguna vista*/
  standalone: true,
  imports: [TranslateModule,CommonModule,ReactiveFormsModule,HeaderComponent],
  templateUrl: './calendarioEventos.component.html',/**nombre del archivo que contiene la vista del componente */
  styleUrl: './calendarioEventos.component.css'/**estilos que se van a usar en este componente particular */
})
export class CalendarioEventosComponent implements OnInit  {
  calendarioEventos: Array<CalendarioEventos> = [];

  bottonDisable:Boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private calendarioEventosService: CalendarioEventos
  ) {  }

  getCalendarioEventosList() {
    this.calendarioEventosService.getCalendarioEventos().subscribe(calendarioEventos => {
      this.calendarioEventos = calendarioEventos;
    });
  }

  ngOnInit() {
    this.getCalendarioEventosList();
  }


  alphanumeric(control: FormControl) {
    const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;
    const value = control.value;
    const isValid = alphanumericRegex.test(value);
    return isValid ? null : { 'alphanumeric': true };
  }

  alphabetical(control: FormControl) {
    const alphabeticalRegex = /^[a-zA-Z ]*$/;
    const value = control.value;
    const isValid = alphabeticalRegex.test(value);
    return isValid ? null : { 'alphabetical': true };
  }

  numeric(control: FormControl) {
    const numericRegex = /^[0-9]*$/;
    const value = control.value;
    const isValid = numericRegex.test(value);
    return isValid ? null : { 'numeric': true };
  }

}
