import { Component, OnInit, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrarModel } from '../../../shared/models/registrar.model';
import {
  TiposIdentificacion,
  Genero,
  Rol,
} from '../../../shared/models/enums.model';
import { SeguridadService } from '../../../shared/services/seguridad/seguridad.service';
import { DeportistaService } from '../../../shared/services/deportista/deportista.service';
import { RegistrarDeportistaModel } from '../../../shared/models/registrar-deportista.model';
import { Router } from '@angular/router';
import { CountriesService } from '../../../shared/services/countries/countries.service';
import { Countries, Country, Citie } from '../../../shared/models/countries.model';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css',
})
export class RegistrarComponent implements OnInit {
  registerForm: any;
  selectedCountry: number = 0;

  tipoIdentificaList = Object.entries(TiposIdentificacion);
  generoList = Object.entries(Genero);

  private seguridadService = inject(SeguridadService);
  private deportistaService = inject(DeportistaService);
  private countriesService = inject(CountriesService);

  paisesNacimiento = signal<Country[]>([]);
  ciudadesNacimiento = signal<Citie[]>([]);
  paisesResidencia = signal<Country[]>([]);
  ciudadesResidencia = signal<Citie[]>([]);


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      tipo_identificacion: ['', [Validators.required]],
      numero_identificacion: ['', [Validators.required]],
      genero_nacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]],
      estatura: ['', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]],
      deportes_desea_practicar: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      pais_nacimiento: ['', [Validators.required]],
      ciudad_nacimiento: ['', [Validators.required]],
      pais_residencia : ['', [Validators.required]],
      ciudad_residencia : ['', [Validators.required]],
    });
    this.getCountries();   
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.toastr.error('Error', 'Por favor, revise los campos');
      return;
    } else {
      const registerModel: RegistrarModel = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        rol: Rol.Deportista,
      };
      this.seguridadService.postRegistrarUsuario(registerModel).subscribe(
        (data) => {
          console.log('Deportista registrado');
          console.log(data);
          const deportistaModel: RegistrarDeportistaModel = {
            id_usuario: data.id_usuario,
            nombre: this.registerForm.value.nombre,
            apellido: this.registerForm.value.apellido,
            tipo_identificacion: this.registerForm.value.tipo_identificacion,
            numero_identificacion: this.registerForm.value.numero_identificacion,
            genero: this.registerForm.value.genero_nacimiento,
            edad: this.registerForm.value.edad,
            peso_inicial: this.registerForm.value.peso,
            altura: this.registerForm.value.estatura,
            pais_nacimiento: this.registerForm.value.pais_nacimiento,
            ciudad_nacimiento: this.registerForm.value.ciudad_nacimiento,
            pais_residencia: this.registerForm.value.pais_residencia,
            ciudad_residencia: this.registerForm.value.ciudad_residencia,
            deporte_practicar: this.registerForm.value.deportes_desea_practicar,
          };
          this.deportistaService
            .postRegistrarDeportista(deportistaModel)
            .subscribe((data) => {
              console.log('Data deportista registrado');
              console.log(data);

              this.toastr.success('Registro exitoso', 'Usuario registrado');
              this.router.navigate([
                '/confirmar-registro',
                this.registerForm.value.email,
              ]);
            });
        },
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 401:
              this.toastr.error('Error', error.error.mssg);
              break;
            case 404:
              this.toastr.error('Error', error.error.mssg);
              break;
            case 400:
              this.toastr.error('Error', error.error.mssg);
              break;
            default:
              this.toastr.error('Error', error.error.mssg);
              console.log(error);
              break;
          }
        }
      );
    }
  }

  getCountries() {
    this.countriesService.getPaises().subscribe({
      next: (data) => {
        this.paisesNacimiento.set(data.countries);
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

  getCitiesForCountryNacimiento() {
    const idPais: number = Number(this.registerForm.get('pais_nacimiento').value);
    if(idPais > 0){

      this.countriesService.getCitiesForCountry(idPais).subscribe({
        next: (data) => {
          this.ciudadesNacimiento.set(data);         
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
      this.ciudadesNacimiento.set([]);
    }
    
  }

  getCitiesForCountryRecidencia() {
    const idPais: number = Number(this.registerForm.get('pais_residencia').value);
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
