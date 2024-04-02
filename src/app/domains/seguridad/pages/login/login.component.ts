import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { UserLogin } from '../../../shared/models/user'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  form = this.formBuilder.nonNullable.group({
    username: ['', [ Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  langs: String [] = [];
  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private translate: TranslateService
 ) {}
  
 changeLang (lang :string){
  this.translate.use(lang)
}

login(user:UserLogin) {
  console.log(user.username)
  console.log(user.password)
  this.toastr.error("Confirmation", "validar credenciales ")
}

ngOnInit(): void {
  localStorage.removeItem('companyId');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  this.langs = this.translate.getLangs();
  this.loginForm = this.formBuilder.group({
      username:["",[Validators.required]],
      password:["",[Validators.required]],
      languaje:["",[Validators.required]]
    })
}

}
