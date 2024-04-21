import { Component,OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from './../../../shared/components/header/header.component'
import { RecomendacionesBuscarJson, Recomendaciones } from '../../../shared/models/buscar_recomendaciones.model';
import { BuscarRecomendacionService } from '../../../shared/services/recomendacion/buscar-recomendacion.service';
import { Ciudades } from '../../../shared/models/ciudades.model';
import { CiudadesService } from '../../../shared/services/ciudades/ciudades.service';

@Component({
  selector: 'app-rutas-eventos',
  standalone: true,
  imports: [TranslateModule,CommonModule,DatePipe, ReactiveFormsModule,HeaderComponent],
  templateUrl: './rutas-eventos.component.html',
  styleUrl: './rutas-eventos.component.css'
})
export class RutasEventosComponent implements OnInit {
  buscarForm: any;

  public fechaMinima:Date= new Date();
  public fechaMaxima:Date= new Date();

  private buscarRecomendacionesService = inject(BuscarRecomendacionService);
  private ciudadesService = inject(CiudadesService)

  recomendaciones = signal<Recomendaciones[]>([]);
  ciudades = signal<Ciudades[]>([])

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) {
  }

  ngOnInit() {

    this.fechaMinima = new Date();
    const unAnioDespues = new Date();
    unAnioDespues.setFullYear(new Date().getFullYear() + 1);
    this.fechaMaxima = unAnioDespues;
    
    this.buscarForm = this.formBuilder.group({
      ciudades: ['',[Validators.required]],
      fecha_prevista: ['',[this.fechaValida]]
    });

    this.getCiudadesLista();

  }

  getCiudadesLista(){
    this.ciudadesService.getCiudades()
    .subscribe({
      next: (ciudad) => {
        this.ciudades.set(ciudad);
      },
      error: (err) => {
        console.error('Error al cargar ciudades:', err);
    if (err instanceof HttpErrorResponse) {
        console.error('Status:', err.status);
        console.error('Mensaje:', err.message);
        console.error('URL:', err.url);
        if (err.error instanceof Error) {
            // El error del lado del cliente (p. ej., red)
            console.error('Error del cliente:', err.error.message);
        } else {
            // El error del lado del servidor
            console.error('Error del servidor:', err.error);
        }
    } else {
        // Error en el cliente Angular
        console.error('Error Angular:', err);
    }
      }
    })
  }

  fechaValida(control: FormControl): { [key: string]: any } | null {    
    if(control.value){
      var partes = control.value.split('-');
      const dia = parseInt(partes[2], 10);
      const mes = parseInt(partes[1], 10) - 1; // Los meses en JavaScript son base 0
      const anio = parseInt(partes[0], 10);
      const fechaSeleccionada = new Date(anio, mes, dia,0,0,0,0); 
      const fechaActual = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),0,0,0,0);
    
      // Validar que la fecha no sea menor a la fecha actual
      if (fechaSeleccionada < fechaActual) {
        return { 'fechaPasada': true };
      }
  
      // Validar que la fecha no sea mayor a un año desde la fecha actual
      const unAnioDespues = new Date();
      unAnioDespues.setHours(0, 0, 0, 0);
      unAnioDespues.setFullYear(fechaActual.getFullYear() + 1);
      if (fechaSeleccionada > unAnioDespues) {
        return { 'fechaFutura': true };
      }
    }  
    return null;
  }

  buscarRecomendaciones(): void{
    if (this.buscarForm.invalid) {
      this.toastr.error("Error", "Por favor, revise los campos")
      return;
    }else{
         const busqueda: RecomendacionesBuscarJson = {
          ciudad: this.buscarForm.get('ciudades').value,
          fecha_prevista: this.buscarForm.value.fecha_prevista
        };
        
        this.buscarRecomendacionesService.postBuscarRecomendaciones(busqueda)
        .subscribe({
          next: (recomendacion) => {
            this.recomendaciones.set(recomendacion)
          },
          error: (er) => {
            // Manejar el error
          if (er.status == 412){
            this.toastr.error("Error", "Revisar los parametros de busqueda")
          }
          if(er.status == 404){
            this.toastr.info("Información", "No se encontraron registros")
            this.recomendaciones.set([])
          }
          else{
            this.toastr.error("Error", "Ha ocurrido un error")
            console.log(er);  }
          }
        });
    }
  }
}