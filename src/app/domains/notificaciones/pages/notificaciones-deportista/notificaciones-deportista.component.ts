import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { NotificacionesService } from '../../../shared/services/notificaciones/notificaciones.service';
import { Notificaciones } from '../../../shared/models/notificaciones.model';

@Component({
  selector: 'app-notificaciones-deportista',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './notificaciones-deportista.component.html',
  styleUrl: './notificaciones-deportista.component.css'
})
export class NotificacionesDeportistaComponent implements OnInit  {

  private notificacionService = inject(NotificacionesService);
  
  notificacionesDeportista = signal<Notificaciones[]>([])

  private idUser: string = sessionStorage.getItem('idUsuario') ?? '';

  constructor(private toastr:ToastrService,
    private translate: TranslateService
){ }

  ngOnInit() {
  this.getNotificacionesDeportista(this.idUser);
  }

  getNotificacionesDeportista(idDeportista: string){
    if(idDeportista){
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
  }
}
