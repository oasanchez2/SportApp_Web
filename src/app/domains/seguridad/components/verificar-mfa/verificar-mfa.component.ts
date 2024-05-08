import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
import { ToastrService } from 'ngx-toastr';
import { VerifyMFAModel } from '../../../shared/models/login.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-activar-mfa',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule, RouterLinkWithHref,QRCodeModule],
  templateUrl: './verificar-mfa.component.html',
  styleUrl: './verificar-mfa.component.css'
})
export class verificarMfaComponent implements OnInit {
  activarMFAForm: any;
  
  sessionUser: string = '';
  secretCode: string = '';

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
      if (this.sessionUser) {
        const verifyModel: VerifyMFAModel = {
          session: this.sessionUser,
          user_code: this.activarMFAForm.get('codigo_MFA').value,
        };

        this.seguridadService.postVerifyMFA(verifyModel).subscribe({
          next: (result) => {
            console.log(result);
            if(result.Status === 'SUCCESS'){
              this.toastr.success('Éxito', 'MFA activado correctamente, por favor inicie sesión nuevamente');              
            }else{
              this.toastr.error('Error', 'No se ha podido activar el MFA, por favor intente nuevamente');
            }
            this.bsModalRef.hide();
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
