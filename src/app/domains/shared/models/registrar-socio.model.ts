import { Genero, TiposIdentificacion, Especialidad } from './enums.model';

export interface RegistrarSocioModel {
    id_usuario: string;
    nombre: string;
    apellido: string;
    especialidad: Especialidad;
    anios_experiencia: number; 
    genero: Genero;
    telefono: number;
    tipo_identificacion: TiposIdentificacion;
    numero_identificacion: string;
    numero_tarjeta_profesional: string;
    pais_recidencia: string;
    ciudad_recidencia: string;
    organizador: boolean;
}