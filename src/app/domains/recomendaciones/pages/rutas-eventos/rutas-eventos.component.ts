import { Component,OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './../../../shared/components/header/header.component'
import { RecomendacionesBuscarJson, Recomendaciones } from '../../../shared/models/buscar_recomendaciones.model';
import { BuscarRecomendacionService } from '../../../shared/services/recomendacion/buscar-recomendacion.service';

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

  recomendaciones = signal<Recomendaciones[]>([]);

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
          else{
            this.toastr.error("Error", "Ha ocurrido un error")
            console.log(er);  }
          }
        });
    }
  }
}