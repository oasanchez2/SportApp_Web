import { Component, Input, OnInit, inject, input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmarRegistroModel } from '../../../shared/models/confirmar_registro.model';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-registro',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './confirmar-registro.component.html',
  styleUrl: './confirmar-registro.component.css',
})
export class ConfirmarRegistroComponent implements OnInit {
  confirForm: any;

  @Input() email?: string;

  private seguridadService = inject(SeguridadService);

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.confirForm = this.formBuilder.group({
      codigo: ['', [Validators.required]],
    });
  }

  confirmar(): void {
    if (this.email) {
      if (this.confirForm.invalid) {
        this.toastr.error('Error', 'Por favor, revise los campos');
        return;
      } else if (!this.isValidEmail(this.email)) {
        this.toastr.error('Error', 'No se encontro un email válido');
        return;
      } else {
        const confirmarModel: ConfirmarRegistroModel = {
          email: this.email,
          codigo_confirmacion: this.confirForm.get('codigo').value,
        };
        this.seguridadService.postConfirmarRegistroUsuario(confirmarModel).subscribe(
          (data) => {
            console.log(data);
            this.toastr.success('Exito', 'Registro confirmado');
            this.router.navigate(['/login']);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error('Error', error.error.mssg);
          }
        )
      }

    } else {
      this.toastr.error('Error', 'No se ha recibido el email');
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
