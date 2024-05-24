import { TableColumn } from "../components/table/CustomTable";
import { ArticuloInsumo } from "./Insumo";
import { UnidadMedida } from "./UnidadMedida";

export interface ArticuloManufacturadoDetalle {
	id: number | null;
	eliminado: boolean;
	cantidad: number;
	articuloInsumo: ArticuloInsumo;
}

export interface ArticuloManufacturado {
	id: number | null;
	eliminado: boolean;
	denominacion: string;
	precioVenta: number;
	imagenes: string[] | null;
	unidadMedida: UnidadMedida;
	categoriaId: string;
	descripcion: string;
	tiempoEstimadoMinutos: number;
	preparacion: string;
	articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[];
}

export const manufacturadoColumns: TableColumn[] = [
    { label: "Denominación", key: "denominacion" },
    { label: "Precio de Venta", key: "precioVenta" },
    { label: "Descripción", key: "descripcion" },
    { label: "Preparación", key: "preparacion" },
    { label: "Unidad de Medida", key: "unidadMedida.denominacion" }, // Anidado
    { label: "Acciones", key: "acciones" }
];