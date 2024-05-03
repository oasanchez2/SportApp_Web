import { Component,OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { TiposIdentificacion } from '../../../shared/models/registrar.model';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [TranslateModule,CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {
  registerForm: any;

  tipoIdList = Object.entries(TiposIdentificacion);

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      tipo_dentificacion: ['', [Validators.required]],
      numero_identificacion: ['', [Validators.required]],
      genero_nacimeinto: ['', [Validators.required]],
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
      /*
      const registerModel: RegisterModel = {
        nombre: this.registerForm.value.nombre,
        apellido: this.registerForm.value.apellido,
        tipo_dentificacion: this.registerForm.value.tipo_dentificacion,
        numero_identificacion: this.registerForm.value.numero_identificacion,
        genero_nacimeinto: this.registerForm.value.genero_nacimeinto,
        edad: this.registerForm.value.edad,
        peso: this.registerForm.value.peso,
        estatura: this.registerForm.value.estatura,
        deportes_desea_practicar: this.registerForm.value.deportes_desea_practicar,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      this.registerService.postRegisterUsuario(registerModel).subscribe(
        (data) => {
          this.toastr.success('Registro exitoso', 'Usuario registrado');
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Error', 'No se pudo registrar el usuario');
        }
      );
      */
    }
  }
}
