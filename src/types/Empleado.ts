import { TableColumn } from "../components/table/CustomTable";
import { Pedido } from "./Pedido";
import { Sucursal } from "./Sucursal";

export interface Empleado {
	id: number | null;
	eliminado: boolean;
	tipoEmpleado: string;
	nombre: string;
	apellido: string;
	telefono: string;
	email: string;
	fechaNacimiento: string;
	usuarioEmpleado: {
		id: null;
		eliminado: boolean;
		auth0Id: string;
		userName: string;
	};
	imagenes?: string | null;
	pedidos: Pedido[];
	sucursal: Sucursal | null;
}

// Usado para mappear las columnas de la tabla
export const empleadoColumns: TableColumn[] = [
	{ label: "Nombre", key: "nombre" },
	{ label: "Apellido", key: "apellido" },
	{ label: "Email", key: "email" },
	{ label: "Rol", key: "tipoEmpleado" },
	{ label: "Acciones", key: "Acciones" },
];
