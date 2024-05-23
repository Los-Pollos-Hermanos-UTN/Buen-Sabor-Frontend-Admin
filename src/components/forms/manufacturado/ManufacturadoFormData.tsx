import * as yup from "yup";
import { ArticuloManufacturado } from "../../../types/Manufacturado";
import { FormStep } from "../FormStep";
import { ManufacturadoStep1 } from "./steps/ManufacturadoStep1";
import { ManufacturadoStep2 } from "./steps/ManufacturadoStep2";
import { ManufacturadoStep3 } from "./steps/ManufacturadoStep3";

export const ArticuloManufacturadoInitialValues: ArticuloManufacturado = {
	id: null,
	eliminado: false,
	denominacion: "",
	precioVenta: 0,
	imagenes: [],  // Cambiado de null a []
	unidadMedida: {
		id: null,
		eliminado: false,
		denominacion: "",
	},
	descripcion: "",
	tiempoEstimadoMinutos: 0,
	preparacion: "",
	articuloManufacturadoDetalles: [],
	categoriaId: "",
};

export const ArticuloManufacturadoValidationSchemas = [
	// Esquema de validación para el paso 1
	yup.object().shape({
		eliminado: yup.boolean().default(false),
		denominacion: yup
			.string()
			.required("La denominación del artículo manufacturado es requerida"),
		precioVenta: yup.number().required("El precio de venta es requerido"),
		// imagenes: yup.mixed().nullable(),  // Eliminado para el paso 1
		descripcion: yup
			.string()
			.required("La descripción del artículo manufacturado es requerida"),
		preparacion: yup
			.string()
			.required("La preparación del artículo manufacturado es requerida"),
		categoriaId: yup.string().required("La categoria es requerida"),
	}),
	// Esquema de validación para el paso 2
	yup.object().shape({
		unidadMedida: yup.object().shape({
			id: yup.number().nullable(),
			eliminado: yup.boolean().required(),
			denominacion: yup.string().required(),
		}),
		tiempoEstimadoMinutos: yup
			.number()
			.required("El tiempo estimado en minutos es requerido"),
		articuloManufacturadoDetalles: yup.array(),
	}),
	// Esquema de validación para el paso 3
	yup.object().shape({
		imagenes: yup
			.array()
			.min(1, "Debes agregar al menos una imagen")
			.required("Las imágenes son requeridas")
	}),
];

export const ArticuloManufacturadoFormSteps: FormStep[] = [
	{
		number: 1,
		icon: 1,
		label: "Detalles del Producto",
		isSubstep: false,
		fields: <ManufacturadoStep1 />,
	},
	{
		number: 2,
		icon: 2,
		label: "Detalles del Ingrediente",
		isSubstep: false,
		fields: <ManufacturadoStep2 />,
	},
	{
		number: 3,
		icon: 3,
		label: "Preview",
		isSubstep: false,
		fields: <ManufacturadoStep3 />,
	},
];
