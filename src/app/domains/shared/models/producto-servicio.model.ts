
export enum TipoOferta {
    Servicio = 'Servicio',
    Producto = 'Producto'
}
export interface ProductoServicio{
    id_producto_servicio: string,
    id_socio: string,
    nombre: string,
    descripcion:string,
    costo: number,
    tipo_oferta: TipoOferta,
    fecha_creacion: Date
}

export interface ProductoServicioJson{
    id_socio: string,
    nombre: string,
    descripcion:string,
    costo: number,
    tipo_oferta: TipoOferta
}