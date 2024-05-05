import { Component, OnInit, ViewChild, inject, signal, ElementRef, TemplateRef } from '@angular/core';
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
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivarMfaComponent } from '../../components/activar-mfa/activar-mfa.component';
import { ModalBackdropComponent } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLinkWithHref,
    ActivarMfaComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  loginForm: any;
  bsModalRef?: BsModalRef;
  modalRef?: BsModalRef;
  sessionUser: string = '';
  emailUser: string = '';

  private seguridadService = inject(SeguridadService);

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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

  login(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Error', 'Por favor, revise los campos');
      return;
    } else {
      const loginModel: LoginModel = {
        username: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      this.seguridadService.postloginUsuario(loginModel).subscribe({
        next: (tokens) => {
          console.log(tokens);
            if (  
            tokens.ChallengeName == 'MFA_SETUP' &&
            tokens.ChallengeParameters.MFAS_CAN_SETUP.includes('SOFTWARE_TOKEN_MFA')
            ) {
            // si es asi, se debe mostrar el formulario de activarMFAForm
            this.sessionUser = tokens.Session;
            this.emailUser = this.loginForm.get('email').value;
            this.openModalWithComponent();
            
            } else {
            // si no, se debe redirigir a la pagina de inicio
            console.log('redirigir a la pagina de inicio');
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
    }
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        sessionUser: this.sessionUser,
        emailUser: this.emailUser
      }
    };
    this.bsModalRef = this.modalService.show(ActivarMfaComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  
}
