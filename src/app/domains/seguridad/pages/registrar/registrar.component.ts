import { Component,OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrarModel } from '../../../shared/models/registrar.model';
import { TiposIdentificacion, Genero, Rol } from '../../../shared/models/enums.model';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
import { DeportistaService } from '../../../shared/services/deportista/deportista.service';
import { RegistrarDeportistaModel } from '../../../shared/models/registrar-deportista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [TranslateModule,CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {
  registerForm: any;

  tipoIdentificaList = Object.entries(TiposIdentificacion);
  generoList = Object.entries(Genero);

  private seguridadService = inject(SeguridadService);
  private deportistaService = inject(DeportistaService);

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      tipo_identificacion: ['', [Validators.required]],
      numero_identificacion: ['', [Validators.required]],
      genero_nacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]],
      estatura: ['', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]],
      deportes_desea_practicar: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
          ),
        ],
      ],
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.toastr.error('Error', 'Por favor, revise los campos');
      return;
    } else {      
      const registerModel: RegistrarModel = {        
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        rol: Rol.Deportista,
      };
      this.seguridadService.postRegistrarUsuario(registerModel).subscribe(
        (data) => {
          console.log('Deportista registrado');
          console.log(data);
          const deportistaModel: RegistrarDeportistaModel = {
            id_usuario: data.id_usuario,
            nombre: this.registerForm.value.nombre,
            apellido: this.registerForm.value.apellido,
            tipo_identificacion: this.registerForm.value.tipo_identificacion,
            numero_identificacion: this.registerForm.value.numero_identificacion,
            genero: this.registerForm.value.genero_nacimiento,
            edad: this.registerForm.value.edad,
            peso_inicial: this.registerForm.value.peso,
            altura: this.registerForm.value.estatura,
            pais_recidencia: 'Colombia',
            ciudad_recidencia: 'Bogotá',
            deporte_practicar: this.registerForm.value.deportes_desea_practicar
          };
          this.deportistaService.postRegistrarDeportista(deportistaModel).subscribe(
            (data) => {
              console.log('Data deportista registrado');
              console.log(data);

              this.toastr.success('Registro exitoso', 'Usuario registrado');          
              this.router.navigate(['/confirmar-registro',this.registerForm.value.email]);
            }
          );                  
        },
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 401:
              this.toastr.error('Error', error.error.mssg);
              break;
            case 404:
              this.toastr.error('Error', error.error.mssg);
              break;
            case 400:
              this.toastr.error('Error', error.error.mssg);
              break;
            default:
              this.toastr.error('Error', error.error.mssg);
              console.log(error);
              break;
          }
        }
      );      
    }
  }
}
