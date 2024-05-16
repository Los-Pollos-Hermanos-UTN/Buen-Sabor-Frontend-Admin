import { Localidad } from "./Localidad";

export interface Domicilio {
    calle: string;
    numero: number;
    cp: number;
    piso?: number;
    nroDepto?: number;
    localidad: Localidad;
}