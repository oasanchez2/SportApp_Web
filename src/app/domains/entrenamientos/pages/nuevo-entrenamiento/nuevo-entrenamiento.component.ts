import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-entrenamiento',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './nuevo-entrenamiento.component.html',
  styleUrl: './nuevo-entrenamiento.component.css'
})
export class NuevoEntrenamientoComponent implements OnInit  {
  companyForm: any;

  bottonDisable:Boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) {
  }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      name: ['', [Validators.required, this.alphanumeric]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, this.alphanumeric]],
      country: ['', [Validators.required]],
      dept: ['', [Validators.required]],
      city: ['', [Validators.required, this.alphabetical]],
      phone: ['', [Validators.required, this.numeric]],
      contact_name: ['', [Validators.required, this.alphabetical]],
      contact_phone: ['', [Validators.required, this.numeric]],
    });
  }

  
  alphanumeric(control: FormControl) {
    const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;
    const value = control.value;
    const isValid = alphanumericRegex.test(value);
    return isValid ? null : { 'alphanumeric': true };
  }

  alphabetical(control: FormControl) {
    const alphabeticalRegex = /^[a-zA-Z ]*$/;
    const value = control.value;
    const isValid = alphabeticalRegex.test(value);
    return isValid ? null : { 'alphabetical': true };
  }

  numeric(control: FormControl) {
    const numericRegex = /^[0-9]*$/;
    const value = control.value;
    const isValid = numericRegex.test(value);
    return isValid ? null : { 'numeric': true };
  }

}
