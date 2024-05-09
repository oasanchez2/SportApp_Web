import { Component, OnInit, inject,  EventEmitter,} from '@angular/core';
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
import { LoginModel } from '../../../shared/models/login.model';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { verificarMfaComponent } from '../../components/verificar-mfa/verificar-mfa.component';
import { ResponderDesafioComponent } from '../../components/responder-desafio/responder-desafio.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLinkWithHref,
    verificarMfaComponent,
    ResponderDesafioComponent,
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
  secretCode: string = '';
  btnActivarFactor: boolean = false;

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
            tokens.ChallengeParameters.MFAS_CAN_SETUP.includes(
              'SOFTWARE_TOKEN_MFA'
            )
          ) {
            // si es asi, se debe mostrar el componente con formulario de validarMFAForm
            this.sessionUser = tokens.Session;
            this.emailUser = this.loginForm.get('email').value;
            const issuer = 'SportApp';
            //const qrUrl = `otpa:${issuer}/totp?account=${this.emailUser}&secret=${tokens.SecretCode}`;
            //const qrUrl = `otpauth://totp/${issuer}?secret=${tokens.SecretCode}&issuer=${this.emailUser}`;
            const qrUrl = `otpauth://totp/${issuer}:${this.emailUser}?secret=${tokens.SecretCode}&issuer=${issuer}`;
            console.log(qrUrl);
            this.secretCode = qrUrl;
            this.openModalWithComponentVerify();
            this.loginForm.reset();
            this.btnActivarFactor = true;
          } else if (tokens.ChallengeName == 'SOFTWARE_TOKEN_MFA') {
            this.sessionUser = tokens.Session;
            this.emailUser = this.loginForm.get('email').value;
            this.openModalWithComponentDesafio();
            this.loginForm.reset();
          } else {
            this.toastr.error('Error', 'No se recibio la respuesta esperada');
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

  // Método que maneja el evento emitido por el componente hijo
  onBtnActiarFactor(value: boolean) {
    this.btnActivarFactor = value;
  }


  openModalWithComponentVerify() {
    const initialState: ModalOptions = {
      initialState: {
        sessionUser: this.sessionUser,
        secretCode: this.secretCode,
      },
    };
    this.bsModalRef = this.modalService.show(verificarMfaComponent, initialState,);
    this.bsModalRef.content.event.subscribe((event: any) => {
      this.onBtnActiarFactor(event.btnActivarFactor);
    });
  }

  openModalWithComponentDesafio() {
    const initialState: ModalOptions = {
      initialState: {
        sessionUser: this.sessionUser,
        emailUser: this.emailUser,
      },
    };
    this.bsModalRef = this.modalService.show(ResponderDesafioComponent, initialState);
  }

}
