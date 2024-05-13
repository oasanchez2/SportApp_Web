import { Genero, TiposIdentificacion, Especialidad, Plan } from './enums.model';

export interface RegistrarDeportistaModel {
    id_usuario: string;
    nombre: string;
    apellido: string;
    tipo_identificacion: TiposIdentificacion;
    numero_identificacion: string;
    genero: Genero;
    edad: number;
    peso_inicial: number;
    altura: number;
    pais_recidencia: string;
    ciudad_recidencia: string;
    deporte_practicar: string;
    plan?: Plan;    
}
