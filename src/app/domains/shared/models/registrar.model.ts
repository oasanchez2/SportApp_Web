import { en, ex } from "@fullcalendar/core/internal-common";

export enum TiposIdentificacion {
    CC = 'Cédula de ciudadanía',
    TI = 'Tarjeta de identidad',
    CE = 'Cédula de extranjería',
    Pasaporte = 'Pasaporte',
    NIT = 'NIT',
}

export enum Genero {    
    Masculino = 'Masculino',
    Femenino = 'Femenino'
}

export interface RegistrarModel {
    nombre: string;
    apellido: string;
    tipo_identificacion: TiposIdentificacion;
    numero_identificacion: number;
    genero_nacimiento: Genero;
    edad: number;
    peso: number;
    estatura: number;
    deportes_desea_practicar: string;
    email: string;
    password: string;
    rol: string;    
}

export interface RegistrarResult {
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
    email: string;
    password: string;
    rol: string;    
    
}