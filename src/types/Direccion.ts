import { Localidad } from "./Localidad";

export interface Direccion {
    calle: string;
    numero: number;
    cp: number;
    piso?: number;
    nroDepto?: number;
    localidad: Localidad;
}