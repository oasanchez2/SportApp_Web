export interface Evento{
    id_evento: string;
    nombre: string;    
    fecha_evento: Date;
    id_socio: string;
    descripcion: string;
    nivel: string;
    estado: boolean;
}

export interface DeportistaEvento{
    id_usuario: string;    
    id_evento: string;
    fecha_suscripcion: Date;
    estado_suscripcion: boolean;
}

export interface DeportistaEventoJson{
    id_usuario: string; 
    id_evento: string;
    fecha_suscripcion: Date;
    estado_suscripcion: boolean;
    evento: Evento;
}