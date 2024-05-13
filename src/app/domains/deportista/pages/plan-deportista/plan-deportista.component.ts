import { Component, OnInit, inject, TemplateRef  } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Planes } from '../../../shared/models/enums.model';
import { DeportistaService } from '../../../shared/services/deportista/deportista.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-deportista',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './plan-deportista.component.html',
  styleUrl: './plan-deportista.component.css'
})
export class PlanDeportistaComponent  implements OnInit {
  planForm: any;
  modalRef?: BsModalRef;
  planSeleccionado: string = '';
  Planes = Planes;
  sessionIdUser: string = '' 
  
  deportistaService = inject(DeportistaService);
  
  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.planForm = this.formBuilder.group({
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
    
    this.sessionIdUser = sessionStorage.getItem('idUsuario') || '';
  }


  openModal(template: TemplateRef<void>,plan: Planes) {
    this.planSeleccionado = plan;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    if(this.planSeleccionado){
      this.deportistaService.pachActualizarPlan(this.sessionIdUser, this.planSeleccionado).subscribe((data) => {
        console.log(data);

        this.toastr.success('Confirmed!. Plan seleccionado: ' + this.planSeleccionado);
        this.modalRef?.hide();
        this.router.navigate(['/home-deportista']);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Error', error.error.mssg);
        }
      );      
    }
    else{
      this.toastr.error('No se ha seleccionado un plan');
      this.modalRef?.hide();
    }
  }
 
  decline(): void {    
    this.modalRef?.hide();
  }
}
