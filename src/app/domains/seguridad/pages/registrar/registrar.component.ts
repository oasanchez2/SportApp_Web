import { Component,OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrarModel, TiposIdentificacion, Genero } from '../../../shared/models/registrar.model';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      tipo_dentificacion: ['', [Validators.required]],
      numero_identificacion: ['', [Validators.required]],
      genero_nacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      peso: ['', [Validators.required], [Validators.pattern(/^[0-9]+$/)]],
      estatura: ['', [Validators.required], [Validators.pattern(/^[0-9]+$/)]],
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
        nombre: this.registerForm.value.nombre,
        apellido: this.registerForm.value.apellido,
        tipo_identificacion: this.registerForm.value.tipo_dentificacion,
        numero_identificacion: this.registerForm.value.numero_identificacion,
        genero_nacimiento: this.registerForm.value.genero_nacimiento,
        edad: this.registerForm.value.edad,
        peso: this.registerForm.value.peso,
        estatura: this.registerForm.value.estatura,
        deportes_desea_practicar: this.registerForm.value.deportes_desea_practicar,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        rol: 'Deportista',
      };
      this.seguridadService.postRegistrarUsuario(registerModel).subscribe(
        (data) => {
          this.toastr.success('Registro exitoso', 'Usuario registrado');
          console.log(data);
            this.router.navigate(['/confirmar-registro',this.registerForm.value.email]);
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
