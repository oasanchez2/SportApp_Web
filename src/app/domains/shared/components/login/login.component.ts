import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService
 ) {}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  login(){
    if(this.loginForm.valid){
      console.log('Formulario valido');
    }
  }
}
