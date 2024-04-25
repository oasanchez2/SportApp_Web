import { Routes } from '@angular/router';
import { NuevoEntrenamientoComponent } from './domains/entrenamientos/pages/nuevo-entrenamiento/nuevo-entrenamiento.component';
import { NotFoundComponent } from './domains/shared/pages/not-found/not-found.component';
import { CalendarioEventosComponent } from './domains/calendario/pages/calendario-eventos/calendario-eventos.component';
import { HeaderComponent} from './domains/shared/components/header/header.component'
import { RutasEventosComponent } from './domains/recomendaciones/pages/rutas-eventos/rutas-eventos.component';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';
import { NuevoProductoServicioComponent } from './domains/socio/pages/nuevo-producto-servicio/nuevo-producto-servicio.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: NuevoEntrenamientoComponent,
            },
            {
                path:'calendario',
                component: CalendarioEventosComponent
            },
            {
                path:'recomendaciones',
                component: RutasEventosComponent
            },
            {
                path:'producto-servicio',
                component: NuevoProductoServicioComponent
            }
        ]
    },        
    {
        path: '**',
        component: NotFoundComponent
    }
];
