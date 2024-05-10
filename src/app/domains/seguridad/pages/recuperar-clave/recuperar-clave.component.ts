import { Component, Input, OnInit, SimpleChange, SimpleChanges, inject, input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmarRegistroModel } from '../../../shared/models/confirmar_registro.model';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-clave',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.css'
})
export class RecuperarClaveComponent implements OnInit {
  recoveryForm: any;

  @Input() email?: string;

  private seguridadService = inject(SeguridadService);

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.recoveryForm = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
    });
  }


  recovery(): void {
      if (this.recoveryForm.invalid) {
        this.toastr.error('Error', 'Por favor, revise los campos');
        return; 
      } else {
        const email = this.recoveryForm.get('email').value;

        this.seguridadService.postRecuperarClave(email).subscribe(
          (result) => {
            console.log(result);
            this.toastr.success('Exito', 'Registro confirmado');
            this.router.navigate(['/confirmar-recuperar-clave', email]);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error('Error', error.error.mssg);
          }
        )
      }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

}
