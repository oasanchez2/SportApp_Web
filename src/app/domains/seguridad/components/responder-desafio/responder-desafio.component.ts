import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
import { ToastrService } from 'ngx-toastr';
import { DesafioMFAModel } from '../../../shared/models/login.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-responder-desafio',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './responder-desafio.component.html',
  styleUrl: './responder-desafio.component.css'
})
export class ResponderDesafioComponent {
  desafioMFAForm: any;
  
  sessionUser: string = '';
  emailUser: string = '';
  
  private seguridadService = inject(SeguridadService);

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.desafioMFAForm = this.formBuilder.group({
      
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

  desafioMFA(): void {
    if (this.desafioMFAForm.invalid) {
      this.toastr.error('Error', 'Por favor, revise los campos');
      return;
    } else {
      if (this.sessionUser) {
        const desafioModel: DesafioMFAModel = {
          session: this.sessionUser,
          email: this.emailUser,
          mfa_code: this.desafioMFAForm.get('codigo_MFA').value,
        };

        this.seguridadService.postDesafioMFA(desafioModel).subscribe({
          next: (result) => {
            console.log(result);
            if(result.Status === 'SUCCESS'){
              this.toastr.success('Éxito', 'Desafío MFA correcto');              
            }else{
              this.toastr.error('Error', 'Desafio MFA fallo');
            }
     
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