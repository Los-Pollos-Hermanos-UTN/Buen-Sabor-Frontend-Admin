import { Sucursal } from "./Sucursal";

export interface Categoria {
	id?: string;
	parentId?: string;
	denominacion: string;
	subCategorias?: Categoria[];
	sucursales: Sucursal[];
}
