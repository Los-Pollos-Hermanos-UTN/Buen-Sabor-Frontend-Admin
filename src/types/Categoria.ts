import { Sucursal } from "./Sucursal";

export interface Categoria {
	id?: string;
	eliminado?: string;
	padreId?: string | null;
	denominacion: string;
	subCategorias?: Categoria[];
	sucursales: Sucursal[];
}
