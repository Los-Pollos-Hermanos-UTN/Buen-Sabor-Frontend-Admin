import { TableColumn } from "../components/table/CustomTable";

export interface UnidadMedida {
	id: number | null;
	eliminado: boolean;
	denominacion: string;
}

export const unidadMedidaColumns: TableColumn[] = [
	{
		label: "Denominación",
		key: "denominacion",
	},
	{
		label: "Acciones",
		key: "acciones",
		showInfoButton: false,
	},
];
