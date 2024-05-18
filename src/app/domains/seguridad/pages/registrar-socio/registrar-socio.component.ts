import { Component,OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrarModel } from '../../../shared/models/registrar.model';
import { RegistrarSocioModel } from '../../../shared/models/registrar-socio.model';
import { Genero, Rol, Especialidad, TiposIdentificacion } from '../../../shared/models/enums.model';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
import { SociosService } from '../../../shared/services/socios/socios.service';
import { Router } from '@angular/router';
import { CountriesService } from '../../../shared/services/countries/countries.service';
import { Countries, Country, Citie } from '../../../shared/models/countries.model';

@Component({
  selector: 'app-registrar-socio',
  standalone: true,
  imports: [TranslateModule,CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-socio.component.html',
  styleUrl: './registrar-socio.component.css'
})
export class RegistrarSocioComponent implements OnInit{
  registerSocioForm: any;
  generoList = Object.entries(Genero);
  especialidadList = Object.entries(Especialidad);
  tiposIdentificacionList = Object.entries(TiposIdentificacion);

  private seguridadService = inject(SeguridadService);
  private sociosService = inject(SociosService);
  private countriesService = inject(CountriesService);

  paisesResidencia = signal<Country[]>([]);
  ciudadesResidencia = signal<Citie[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    
    this.registerSocioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      anios_experiencia: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      genero_nacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      tipo_identificacion: ['', [Validators.required]],
      numero_identificacion: ['', [Validators.required]],
      numero_tarjeta_profesional: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      organizador: ['', ],
      pais_residencia : ['', [Validators.required]],
      ciudad_residencia : ['', [Validators.required]],
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

    this.getCountries();
  }

  register(): void {
    if (this.registerSocioForm.invalid) {
      this.toastr.error('Error', 'Por favor, revise los campos');
      return;
    } else {      
      const registerModel: RegistrarModel = {    
        email: this.registerSocioForm.value.email,
        password: this.registerSocioForm.value.password,
        rol: Rol.Socio,
      };
      
      this.seguridadService.postRegistrarUsuario(registerModel).subscribe(
        (data) => {
          console.log('Socio registrado');
          console.log(data);
          const registerSocioModel: RegistrarSocioModel = {
            id_usuario: data.id_usuario,
            nombre: this.registerSocioForm.value.nombre,
            apellido: this.registerSocioForm.value.apellido,
            especialidad: this.registerSocioForm.value.especialidad,
            anios_experiencia: this.registerSocioForm.value.anios_experiencia,
            genero: this.registerSocioForm.value.genero_nacimiento,
            telefono: this.registerSocioForm.value.telefono,
            tipo_identificacion: this.registerSocioForm.value.tipo_identificacion,
            numero_identificacion: this.registerSocioForm.value.numero_identificacion,
            numero_tarjeta_profesional: this.registerSocioForm.value.numero_tarjeta_profesional,
            pais_recidencia: this.registerSocioForm.value.pais_residencia,
            ciudad_recidencia: this.registerSocioForm.value.ciudad_residencia,
            organizador: this.registerSocioForm.value.organizador ? true : false,
          };
          
          this.sociosService.postRegistrarSocio(registerSocioModel).subscribe(
            (data) => {
              console.log('Data socio registrado');
              console.log(data);
              this.toastr.success('Registro exitoso', 'Socio registrado');          
              this.router.navigate(['/confirmar-registro',this.registerSocioForm.value.email]);
            },
            (error: HttpErrorResponse) => {
              this.toastr.error('Error', error.error.mssg);
            }
          );       
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Error', error.error.mssg);
        }
      );      
    }
  }

  getCountries() {
    this.countriesService.getPaises().subscribe({
      next: (data) => {
        this.paisesResidencia.set(data.countries);
      },
      error: (err) => {
        console.error('Error al cargar paises:', err);
        if (err instanceof HttpErrorResponse) {
          console.error('Status:', err.status);
          console.error('Mensaje:', err.message);
          console.error('URL:', err.url);
          if (err.error instanceof Error) {
            // El error del lado del cliente (p. ej., red)
            console.error('Error del cliente:', err.error.message);
          } else {
            // El error del lado del servidor
            console.error('Error del servidor:', err.error);
          }
        } else {
          // Error en el cliente Angular
          console.error('Error Angular:', err);
        }
      },
    });
  }

  getCitiesForCountryRecidencia() {
    const idPais: number = Number(this.registerSocioForm.get('pais_residencia').value);
    if(idPais > 0){

      this.countriesService.getCitiesForCountry(idPais).subscribe({
        next: (data) => {      
          this.ciudadesResidencia.set(data);            
        },
        error: (err) => {
          console.error('Error al cargar ciudades:', err);
          if (err instanceof HttpErrorResponse) {
            console.error('Status:', err.status);
            console.error('Mensaje:', err.message);
            console.error('URL:', err.url);
            if (err.error instanceof Error) {
              // El error del lado del cliente (p. ej., red)
              console.error('Error del cliente:', err.error.message);
            } else {
              // El error del lado del servidor
              console.error('Error del servidor:', err.error);
            }
          } else {
            // Error en el cliente Angular
            console.error('Error Angular:', err);
          }
        },
      });
    }else{
      this.ciudadesResidencia.set([]);
    }
    
  }
}
