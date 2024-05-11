import { Genero, TiposIdentificacion } from './enums.model';

export interface DeportistaModel {
    nombre: string;
    apellido: string;
    tipo_identificacion: TiposIdentificacion;
    numero_identificacion: number;
    genero_nacimiento: Genero;
    edad: number;
    peso: number;
    estatura: number;
    deportes_desea_practicar: string;
}

export interface DeportistaResult {
    id_usuario: string;    
    nombre: string;
    apellido: string;
    tipo_identificacion: TiposIdentificacion;
    numero_identificacion: number;
    genero_nacimiento: Genero;
    edad: number;
    peso: number;
    estatura: number;
    deportes_desea_practicar: string;
}