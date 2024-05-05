import { Component, OnInit, ViewChild, inject, signal, ElementRef } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
import { ToastrService } from 'ngx-toastr';
import {
  LoginModel,
  ActivarMFAModel,
} from '../../../shared/models/login.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-activar-mfa',
  standalone: true,
  imports: [TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLinkWithHref,],
  templateUrl: './activar-mfa.component.html',
  styleUrl: './activar-mfa.component.css'
})
export class ActivarMfaComponent implements OnInit {
  activarMFAForm: any;
  
  sessionUser: string = '';
  eamailUser: string = '';

  private seguridadService = inject(SeguridadService);

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.activarMFAForm = this.formBuilder.group({
      codigo_MFA: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  activarMFA(): void {
    if (this.activarMFAForm.invalid) {
      this.toastr.error('Error', 'Por favor, revise los campos');
      return;
    } else {
      if (this.sessionUser && this.eamailUser) {
        const activarModel: ActivarMFAModel = {
          email: this.eamailUser,
          session: this.sessionUser,
          codigo_MFA: this.activarMFAForm.get('codigo_MFA').value,
        };

        this.seguridadService.postActivarMFA(activarModel).subscribe({
          next: (result) => {
            console.log(result);
          },
          error: (er) => {
            // Manejar el error
            console.log(er);
            switch (er.status) {
              case 401:
                this.toastr.error('Error', er.error.mssg);
                break;
              case 404:
                this.toastr.error('Error', er.error.mssg);
                break;
              case 400:
                this.toastr.error('Error', er.error.mssg);
                break;
              default:
                this.toastr.error('Error', er.error.mssg);
                console.log(er);
                break;
            }
          },
        });
      } else {
        this.toastr.error('Error', 'No se ha recibido el email o session');
      }
    }
  }

}
