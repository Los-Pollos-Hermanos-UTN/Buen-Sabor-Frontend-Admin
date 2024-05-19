import { TableColumn } from "../components/table/CustomTable";
import { UnidadMedida } from "./UnidadMedida";

export interface ArticuloInsumo {
	id: number | null;
	eliminado: boolean;
	denominacion: string;
	precioVenta: number | null;
	imagenes: string[] | null;
	unidadMedida: UnidadMedida;
	precioCompra: number;
	stockActual: number;
	stockMaximo: number;
	esParaElaborar: boolean;
}

export const insumoColumns: TableColumn[] = [
	{ label: "Denominación", key: "denominacion" },
	{ label: "Precio de Venta", key: "precioVenta" },
	{ label: "Precio de Compra", key: "precioCompra" },
	{ label: "Stock Actual", key: "stockActual" },
	{ label: "Stock Máximo", key: "stockMaximo" },
	{ label: "Unidad de Medida", key: "unidadMedida.denominacion" }, // Anidado
	{ label: "Para Elaborar", key: "esParaElaborar", isBoolean: true },
	{ label: "Acciones", key: "acciones" },
];
