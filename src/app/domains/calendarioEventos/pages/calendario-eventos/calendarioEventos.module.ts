import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioEventosComponent } from './calendarioEventos.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [CalendarioEventosComponent],
  exports: [CalendarioEventosComponent]
})
export class CalendarioEventosModule { }
