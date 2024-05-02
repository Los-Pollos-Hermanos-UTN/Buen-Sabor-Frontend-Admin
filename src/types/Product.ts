import { TableColumn } from "../components/table/CustomTable";

export interface Product {
	name: string;
	atrb1: string;
	atrb2: string;
	atrb3: string;
}

// Usado para mappear las columnas de la tabla
export const productColumns: TableColumn[] = [
	{ label: "Nombre", key: "name" },
	{ label: "Atributo 1", key: "atrb1" },
	{ label: "Atributo 2", key: "atrb2" },
	{ label: "Atributo 3", key: "atrb3" },
	{ label: "Acciones", key: "Acciones" },
];
