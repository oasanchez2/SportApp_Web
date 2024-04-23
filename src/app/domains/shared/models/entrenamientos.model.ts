export interface Entrenamientos{
    id_entrenamiento: string;
    nombre: string;    
    fecha_entrenamiento: Date;
    id_usuario: string;
    estado: boolean;
    ejercicios: EjercicioJson[]
}

export interface EntrenamientoJson{
    nombre: string;    
    fecha_entrenamiento: Date;
    id_usuario: string;
    estado: boolean;
    ejercicios: EjercicioJson[]
}

export interface EjercicioJson {
    estado: boolean;
    id_ejercicio: string;
    nombre: string;
    url_imagen: string;
    numero_repeticiones: number;
  }
  