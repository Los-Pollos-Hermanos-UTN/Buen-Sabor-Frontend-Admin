import { Dayjs } from "dayjs";
import { TableColumn } from "../components/table/CustomTable";
import { ArticuloInsumo } from "./Insumo";
import { ArticuloManufacturado } from "./Manufacturado";
import { Sucursal } from "./Sucursal";

export interface Promocion {
	id: number | null;
	denominacion: string;
	fechaDesde: Date | Dayjs;
	fechaHasta: Date | Dayjs;
	horaDesde: string | Dayjs;
	horaHasta: string | Dayjs;
	descripcionDescuento: string;
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
	{ label: "Nombre", key: "denominacion" },
	{ label: "Tipo de Descuento", key: "tipoPromocion" },
	{ label: "Aplicar a:", key: "sucursales" },
	{ label: "Desde", key: "fechaDesde" },
	{ label: "Hasta", key: "fechaHasta" },
	{ label: "Tipo", key: "tipoPromocion" },
	{ label: "Acciones", key: "Acciones" },
];
