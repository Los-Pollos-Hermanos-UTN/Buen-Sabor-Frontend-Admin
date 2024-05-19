import { Provincia } from "./Provincia";

export interface Localidad {
    id?: string;
    nombre: string;
    provincia: Provincia;
}