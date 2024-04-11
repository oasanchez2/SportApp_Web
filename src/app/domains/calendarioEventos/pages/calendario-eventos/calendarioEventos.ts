export class CalendarioEventos {
  nombre: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  nivel:string;

    public constructor(nombre: string,fecha: string,lugar: string,descripcion: string,nivel:string) {
    this.nombre = nombre;
    this.fecha = fecha;
    this.lugar = lugar;
    this.descripcion= descripcion;
    this.nivel =nivel;
  }
}
