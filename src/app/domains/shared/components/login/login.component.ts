import { Component, OnInit, inject, signal } from '@angular/core';
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
import { LoginService } from '../../../shared/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLinkWithHref,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: any;

  private loginService = inject(LoginService);

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastr: ToastrService
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

  login(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Error', 'Por favor, revise los campos');
      return;
    } else {
      const loginModel: LoginModel = {
        username: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
        codigo_MFA: this.loginForm.get('codigo_MFA').value,
      };

      this.loginService.postloginUsuario(loginModel).subscribe({
        next: (tokens) => {
          console.log(tokens);
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
}
