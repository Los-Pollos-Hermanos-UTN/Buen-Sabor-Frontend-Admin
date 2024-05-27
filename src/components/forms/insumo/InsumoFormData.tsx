import * as yup from "yup";
import { ArticuloInsumo } from "../../../types/Insumo";
import { FormStep } from "../FormStep";
import { InsumoStep1 } from "./steps/InsumoStep1";
import { InsumoStep2 } from "./steps/InsumoStep2";
import { ImageStep } from "../Image/ImageCarouselStep.tsx";

export const InsumoInitialValues: ArticuloInsumo = {
	id: 0,
	eliminado: false,
	denominacion: "",
	precioVenta: 0,
	imagenes: [],
	unidadMedida: null,
	precioCompra: 0,
	stockActual: 0,
	stockMaximo: 0,
	esParaElaborar: false,
	categoriaId: "",
};

export const InsumoValidationSchemas = [
	// Esquema de validación para el primer paso
	yup.object().shape({
		denominacion: yup
			.string()
			.required("La denominación del insumo es requerida"),
		precioVenta: yup.number().required("Este campo es requerido"),
		precioCompra: yup
			.number()
			.positive("El precio de compra no puede ser negativo")
			.notOneOf([0], "El precio de compra no puede ser 0")
			.required("Este campo es requerido"),
		categoriaId: yup.string().required("La categoria es requerida"),
	}),
	// Esquema de validación para el segundo paso
	yup.object().shape({
		stockActual: yup
			.number()
			.positive("El stock no puede ser negativo")
			.required("El stock actual es requerido"),
		stockMaximo: yup
			.number()
			.positive("El stock máximo no puede ser negativo")
			.notOneOf([0], "El stock máximo no puede ser 0")
			.required("El stock máximo es requerido"),
		esParaElaborar: yup.boolean().required(),
	}),
	// Esquema de validación para el tercer paso (imágenes)
	yup.object().shape({
		imagenes: yup
			.array()
			.min(1, "Debes agregar al menos una imagen")
			.required("Las imágenes son requeridas"),
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
	{
		number: 3,
		icon: 3,
		label: "Agregar Imagen",
		isSubstep: false,
		fields: <ImageStep />,
	},
];
