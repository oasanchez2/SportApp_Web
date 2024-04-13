import { Routes } from '@angular/router';
import { NuevoEntrenamientoComponent } from './domains/entrenamientos/pages/nuevo-entrenamiento/nuevo-entrenamiento.component';
import { NotFoundComponent } from './domains/shared/pages/not-found/not-found.component';
import { CalendarioEventosComponent } from './domains/calendario/pages/calendario-eventos/calendario-eventos.component';
export const routes: Routes = [
    {
        path: '',
        component: NuevoEntrenamientoComponent,        
    },
    {
        path:'calendario',
        component: CalendarioEventosComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
