export interface Entrenamientos{
    id_entrenamiento: string;
    nombre: string;    
    fecha_entrenamiento: Date;
    id_usuario: string;
    estado: boolean;
}

export interface EntrenamientoJson{
    nombre: string;    
    fecha_entrenamiento: Date;
    id_usuario: string;
    estado: boolean;
}