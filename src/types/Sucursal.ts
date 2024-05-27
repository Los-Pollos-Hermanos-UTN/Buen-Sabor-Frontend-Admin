import { Dayjs } from "dayjs";
import { Domicilio } from "./Domicilio";
import { Empresa } from "./Empresa";

export interface Sucursal {
    id?: string;
    eliminado: boolean;
    nombre: string;
    horarioApertura: string | Dayjs;
    horarioCierre: string | Dayjs;
    casaMatriz: boolean;
    domicilio: Domicilio;
    empresa: Empresa;
    promociones: any[];
    categorias: any[];
    empleados: any[];
}