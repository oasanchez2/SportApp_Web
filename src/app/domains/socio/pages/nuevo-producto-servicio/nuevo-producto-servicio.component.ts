import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { SociosService } from '../../../shared/services/socios/socios.service';
import { ProductoServicio,ProductoServicioJson, TipoOferta } from '../../../shared/models/producto-servicio.model';


@Component({
  selector: 'app-nuevo-producto-servicio',
  standalone: true,
  imports: [TranslateModule,CommonModule,DatePipe, ReactiveFormsModule],
  templateUrl: './nuevo-producto-servicio.component.html',
  styleUrl: './nuevo-producto-servicio.component.css'
})
export class NuevoProductoServicioComponent implements OnInit {

  productoServicioForm: any;

  private socioService = inject(SociosService)
  tipoOferta = Object.values(TipoOferta);

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    this.productoServicioForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      tipo_oferta:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      costo:['',[Validators.required, this.numeric]]
    });
  }

  numeric(control: FormControl) {
    const numericRegex = /^[0-9]*$/;
    const value = control.value;
    const isValid = numericRegex.test(value);
    return isValid ? null : { 'numeric': true };
  }

  crearProductoServicio(): void{
    if (this.productoServicioForm.invalid) {
      this.toastr.error("Error", "Por favor, revise los campos")
      return;
    }else{      
        const nuevoProductoServicio: ProductoServicioJson = {
          id_socio: 'ce4a4e82-948d-41d8-b27d-04c8e59973c0',
          nombre: this.productoServicioForm.value.nombre,
          descripcion: this.productoServicioForm.value.descripcion,
          costo: this.productoServicioForm.value.costo,
          tipo_oferta : this.productoServicioForm.value.tipo_oferta
        };
        
        this.socioService.postProductoServicio(nuevoProductoServicio).subscribe(
          (respuesta: ProductoServicio) => {
            // Manejar la respuesta exitosa
            // La respuesta ahora está disponible como un objeto `Entrenamiento`
            console.log('Entrenamiento creado:', respuesta);
            this.toastr.success("Ok", "El entrenamiento creado correctamente!") 
            // Después de guardar los datos, resetea el formulario
            this.productoServicioForm.reset();
            
          },
          (error) => {
            // Manejar el error
            if (error.status == 412){
              this.toastr.error("Error", "El producto o servicio ya existe!")
            }
            else{
              this.toastr.error("Error", "Ha ocurrido un error")
              console.log(error);
            }
          }
        );
    }
  }

}
