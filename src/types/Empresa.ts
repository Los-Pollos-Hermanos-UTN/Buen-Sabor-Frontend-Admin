import { Sucursal } from "./Sucursal";

export interface Empresa {
    name: string;
    branchs: Sucursal[];
}