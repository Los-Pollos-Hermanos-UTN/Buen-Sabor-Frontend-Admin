import { Sucursal } from "./Sucursal";

export interface Categoria {
	denominacion: string;
	subCategorias?: Categoria[];
	sucursales: Sucursal[];
}
