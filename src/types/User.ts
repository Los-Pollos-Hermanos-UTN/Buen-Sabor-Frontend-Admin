import { TableColumn } from "../components/table/CustomTable";

export interface User {
	name: string;
	email: string;
	category: string;
	password: string;
}

// Usado para mappear las columnas de la tabla
export const userColumns: TableColumn[] = [
	{ label: "Nombre", key: "name" },
	{ label: "Email", key: "email" },
	{ label: "Categoría", key: "category" },
	{ label: "Acciones", key: "Acciones" },
];
