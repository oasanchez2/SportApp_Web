export interface RecomendacionesBuscarJson{
    ciudad: string;
    fecha_prevista: Date;
}

export interface Recomendaciones{
    nombre: string;
    lugar: string;
    fecha_evento: Date;
    nivel:string;
    descripcion:string;
}