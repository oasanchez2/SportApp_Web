import { Routes } from '@angular/router';
import { NuevoEntrenamientoComponent } from './domains/entrenamientos/pages/nuevo-entrenamiento/nuevo-entrenamiento.component'
import { NotFoundComponent } from './domains/shared/pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: NuevoEntrenamientoComponent,        
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
