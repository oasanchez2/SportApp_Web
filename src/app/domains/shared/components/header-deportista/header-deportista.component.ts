import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { NotificacionesService } from '../../../shared/services/notificaciones/notificaciones.service';
import { Notificaciones } from '../../models/notificaciones.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header-deportista',
  standalone: true,
  imports: [CommonModule,TranslateModule,RouterLinkWithHref],
  templateUrl: './header-deportista.component.html',
  styleUrl: './header-deportista.component.css'
})
export class HeaderDeportistaComponent implements OnInit {

  private notificacionService = inject(NotificacionesService);
  
  notificacionesDeportista = signal<Notificaciones[]>([])

  constructor(private toastr:ToastrService,
              private translate: TranslateService
  ){ }

  ngOnInit() {
    this.getNotificacionesDeportista('07adc016-82eb-4c92-b722-0e80ebfdcfe5');
  }

  getNotificacionesDeportista(idDeportista: string){
    this.notificacionService.getNotificacionesDeportista(idDeportista)
      .subscribe({
        next: (notificaciones) => {
          this.notificacionesDeportista.set(notificaciones);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

calcularMinutosPasados(fecha: Date): number {
  const ahora = new Date();
  const fechaCreado = new Date(fecha);
  const diferencia = ahora.getTime() - fechaCreado.getTime();
  const minutos = Math.floor(diferencia / (1000 * 60));
  return minutos;
}

}
