import { Component, Input, OnInit, inject, input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmarRegistroModel } from '../../../shared/models/confirmar_registro.model';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
import { Router } from '@angular/router';
import { ConfirmarRecoveryModel } from '../../../shared/models/confirmar_recovery.model';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-confirmar-recuperar-clave',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './confirmar-recuperar-clave.component.html',
  styleUrl: './confirmar-recuperar-clave.component.css',
})
export class ConfirmarRecuperarClaveComponent implements OnInit {
  confirmRecoveryForm: any;

  @Input() email?: string;

  private seguridadService = inject(SeguridadService);

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.confirmRecoveryForm = this.formBuilder.group(
      {
        confirmation_code: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
            ),
          ],
        ],
        confir_password: [
          '',
          [
            Validators.required,
           
          ],
        ],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confir_password')?.value;
    const r = pass === confirmPass ? null : { notSame: true };
    return r;
  }

  confirm_recovery(): void {
    if (this.email) {
      if (this.confirmRecoveryForm.invalid) {
        this.toastr.error('Error', 'Por favor, revise los campos');
        return;
      } else if (!this.isValidEmail(this.email)) {
        this.toastr.error('Error', 'No se encontro un email válido');
        return;
      } else {
        const confirmarRecoveryModel: ConfirmarRecoveryModel = {
          email: this.email,
          confirmation_code: this.confirmRecoveryForm.get('confirmation_code').value,
          password: this.confirmRecoveryForm.get('password').value,
        };

        this.seguridadService
          .postConfirmarRecuperarClave(confirmarRecoveryModel)
          .subscribe(
            (result) => {
              console.log(result);
              this.toastr.success('Exito', 'Recuperación confirmada');
              this.router.navigate(['/login']);
            },
            (error: HttpErrorResponse) => {
              this.toastr.error('Error', error.error.mssg);
            }
          );
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
