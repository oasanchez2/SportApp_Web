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
    pais_nacimiento: string;
    ciudad_nacimiento: string;
    pais_residencia: string;
    ciudad_residencia: string;
    deporte_practicar: string;
    plan?: Plan;    
}
