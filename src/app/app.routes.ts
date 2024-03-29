import { Routes } from '@angular/router';
import { NuevoEntrenamientoComponent } from './domains/entrenamientos/pages/nuevo-entrenamiento/nuevo-entrenamiento.component';
import { LoginComponent } from './domains/seguridad/pages/login/login.component';
import { NotFoundComponent } from './domains/shared/pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: NuevoEntrenamientoComponent,        
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
