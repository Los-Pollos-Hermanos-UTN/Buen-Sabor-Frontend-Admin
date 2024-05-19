import { ArticuloInsumo } from "../../../types/Insumo";
import { FormStep } from "../FormStep";
import { InsumoStep1 } from "./steps/InsumoStep1";
import { InsumoStep2 } from "./steps/InsumoStep2";
import * as yup from "yup";

export const InsumoInitialValues: ArticuloInsumo = {
	id: 0,
	eliminado: false,
	denominacion: "Queso",
	precioVenta: 1000,
	imagenes: null,
	unidadMedida: {
		id: 1,
		eliminado: false,
		denominacion: "Gramos",
	},
	precioCompra: 2000,
	stockActual: 50,
	stockMaximo: 100,
	esParaElaborar: true,
};
export const InsumoValidationSchemas = [
	yup.object().shape({
		// Esquema de validación para el primer paso
		denominacion: yup
			.string()
			.required("La denominación del insumo es requerida"),
		precioVenta: yup.number().required("El precio de venta es requerido"),
		precioCompra: yup.number().required("El precio de compra es requerido"),
	}),
	yup.object().shape({
		// Esquema de validación para el segundo paso
		stockActual: yup.number().required("El stock actual es requerido"),
		stockMaximo: yup.number().required("El stock máximo es requerido"),
		esParaElaborar: yup.boolean().required(),
	}),
];

export const InsumoFormSteps: FormStep[] = [
	{
		number: 1,
		icon: 1,
		label: "Datos del Insumo",
		isSubstep: false,
		fields: <InsumoStep1 />,
	},
	{
		number: 2,
		icon: 2,
		label: "Detalles Adicionales",
		isSubstep: false,
		fields: <InsumoStep2 />,
	},
];