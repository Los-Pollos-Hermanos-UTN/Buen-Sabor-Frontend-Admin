import { TableColumn } from "../components/table/CustomTable";

export interface Promotion {
	name: string;
	type: string;
	aplyTo: string;
	validity: string;
}

// Usado para mappear las columnas de la tabla
export const promotionColumns: TableColumn[] = [
	{ label: "Nombre", key: "name" },
	{ label: "Tipo de Descuento", key: "type" },
	{ label: "Aplicar a:", key: "aplyTo" },
	{ label: "Vigencia", key: "validity" },
	{ label: "Acciones", key: "Acciones" },
];
