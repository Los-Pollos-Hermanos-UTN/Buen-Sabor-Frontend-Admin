import { TableColumn } from "../components/table/CustomTable";
import { ArticuloInsumo } from "./Insumo";
import { ArticuloManufacturado } from "./Manufacturado";
import { Sucursal } from "./Sucursal";

export interface Promocion {
	id: number | null;
	denominacion: string;
	fechaDesde: Date;
	fechaHasta: Date;
	horaDesde: string;
	horaHasta: string;
	descripcion: string;
	precioPromocional: number;
	tipoPromocion: "HAPPY_HOUR" | "PROMOCION" | "";
	imagenes: string[] | null;
	sucursales: Sucursal[];
	promocionDetalles: PromocionDetalle[];
}

export interface PromocionDetalle {
	id: number | null;
	eliminado: boolean;
	cantidad: number;
	articulo: ArticuloInsumo | ArticuloManufacturado;
}

// Usado para mappear las columnas de la tabla
export const promotionColumns: TableColumn[] = [
	{ label: "Nombre", key: "name" },
	{ label: "Tipo de Descuento", key: "type" },
	{ label: "Aplicar a:", key: "aplyTo" },
	{ label: "Vigencia", key: "validity" },
	{ label: "Acciones", key: "Acciones" },
];
