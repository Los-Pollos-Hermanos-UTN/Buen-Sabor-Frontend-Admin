import { Direccion } from "./Direccion";

export interface Sucursal {
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    esCasaMatriz: boolean;
    direccion: Direccion;
}