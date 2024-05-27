import * as yup from "yup";
import { ArticuloManufacturado } from "../../../types/Manufacturado";
import { FormStep } from "../FormStep";
import { ManufacturadoStep1 } from "./steps/ManufacturadoStep1";
import { ManufacturadoStep2 } from "./steps/ManufacturadoStep2";
import { ImageStep } from "../Image/ImageCarouselStep.tsx";

export const ArticuloManufacturadoInitialValues: ArticuloManufacturado = {
	id: null,
	eliminado: false,
	denominacion: "",
	precioVenta: 0,
	imagenes: [], // Cambiado de null a []
	// TODO: Verificar si unidad de medida es necesaria en articulo manufacturado (siempre seria "Unidad")
	unidadMedida: null,
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
		precioVenta: yup
			.number()
			.positive("El precio no puede ser negativo")
			.notOneOf([0], "El precio no puede ser 0")
			.required("El precio es requerido"),
		descripcion: yup
			.string()
			.required("La descripción del artículo manufacturado es requerida"),
		categoriaId: yup.string().required("La categoria es requerida"),
	}),
	// Esquema de validación para el paso 2
	yup.object().shape({
		// TODO: Verificar si unidad de medida es necesaria en articulo manufacturado (siempre seria "Unidad")
		unidadMedida: yup
			.object()
			.shape({
				id: yup.number().nullable(),
				eliminado: yup.boolean().nullable(),
				denominacion: yup.string().nullable(),
			})
			.nullable(),
		preparacion: yup
			.string()
			.required("La preparación del artículo manufacturado es requerida"),
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
			.required("Las imágenes son requeridas"),
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
		label: "Ingredientes",
		isSubstep: false,
		fields: <ManufacturadoStep2 />,
	},
	{
		number: 3,
		icon: 3,
		label: "Agregar Imagen",
		isSubstep: false,
		fields: <ImageStep />,
	},
];
