import { Routes } from '@angular/router';
import { NuevoEntrenamientoComponent } from './domains/entrenamientos/pages/nuevo-entrenamiento/nuevo-entrenamiento.component';
import { NotFoundComponent } from './domains/shared/pages/not-found/not-found.component';
import { CalendarioEventosComponent } from './domains/calendario/pages/calendario-eventos/calendario-eventos.component';
import { HeaderComponent} from './domains/shared/components/header/header.component'
import { RutasEventosComponent } from './domains/recomendaciones/pages/rutas-eventos/rutas-eventos.component';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';
import { NuevoProductoServicioComponent } from './domains/socio/pages/nuevo-producto-servicio/nuevo-producto-servicio.component';
import { LayoutDeportistaComponent } from './domains/shared/components/layout-deportista/layout-deportista.component';
import { NotificacionesDeportistaComponent } from './domains/notificaciones/pages/notificaciones-deportista/notificaciones-deportista.component';
import { InvitadoComponent } from './domains/invitados/pages/invitado/invitado.component';
import { LoginComponent } from './domains/seguridad/pages/login/login.component';
import { RegistrarComponent } from './domains/seguridad/pages/registrar/registrar.component';
import { ConfirmarRegistroComponent } from './domains/seguridad/pages/confirmar-registro/confirmar-registro.component';
import { RecuperarClaveComponent } from './domains/seguridad/pages/recuperar-clave/recuperar-clave.component';
import { ConfirmarRecuperarClaveComponent } from './domains/seguridad/pages/confirmar-recuperar-clave/confirmar-recuperar-clave.component';
import { RegistrarSocioComponent } from './domains/seguridad/pages/registrar-socio/registrar-socio.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: InvitadoComponent,
            },
            {
                path: 'nuevo-entrenamiento',
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
            },
            {
                path:'login',
                component: LoginComponent
            },
            {
                path: 'register-deportista',
                component: RegistrarComponent
            },
            {
                path: 'register-socio',
                component: RegistrarSocioComponent
            },
            {
                path: 'confirmar-registro/:email',
                component: ConfirmarRegistroComponent
            },
            {
                path: 'recuperar-clave',
                component: RecuperarClaveComponent
            },
            {
                path: 'confirmar-recuperar-clave/:email',
                component: ConfirmarRecuperarClaveComponent
            }
        ]
    }, 
    {
        path: '',
        component: LayoutDeportistaComponent,
        children: [
            {
                path:'notificaciones',
                component: NotificacionesDeportistaComponent
            }
        ]
    },       
    {
        path: '**',
        component: NotFoundComponent
    }
];
