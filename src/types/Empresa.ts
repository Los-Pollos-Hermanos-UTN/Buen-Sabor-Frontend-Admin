import { Sucursal } from "./Sucursal";

export interface Empresa {
    id?: string;
    eliminado: boolean;
    nombre: string;
    razonSocial: string;
    cuil: string;
    sucursales?: Sucursal[];
    imagenes?: string | null;
}