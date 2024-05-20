import { Categoria } from "../types/Categoria";

export const flattenCategorias = (categorias: Categoria[]): Categoria[] => {
	let flatCategorias: Categoria[] = [];
	categorias.forEach((categoria) => {
		flatCategorias.push(categoria);
		if (categoria.subCategorias) {
			flatCategorias = flatCategorias.concat(
				flattenCategorias(categoria.subCategorias)
			);
		}
	});
	return flatCategorias;
};
