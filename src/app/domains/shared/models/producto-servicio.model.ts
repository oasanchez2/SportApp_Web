
export enum TipoOferta {
    SERVICIO = 'SERVICIO',
    PRODUCTO = 'PRODUCTO'
}
export interface ProductoServicio{
    id_producto_servicio: string,
    id_socio: string,
    nombre: string,
    descripcion:string,
    costo: number,
    tipo_oferta: TipoOferta
}

export interface ProductoServicioJson{
    id_socio: string,
    nombre: string,
    descripcion:string,
    costo: number,
    tipo_oferta: TipoOferta
}