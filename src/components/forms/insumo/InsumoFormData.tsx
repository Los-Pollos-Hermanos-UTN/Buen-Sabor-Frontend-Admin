import * as yup from "yup";
import { ArticuloInsumo } from "../../../types/Insumo";
import { FormStep } from "../FormStep";
import { InsumoStep1 } from "./steps/InsumoStep1";
import { InsumoStep2 } from "./steps/InsumoStep2";
import { ImageStep } from "../Image/ImageCarouselStep.tsx";
import { InsumoStep3 } from "./steps/InsumoStep3.tsx";

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
	sucursales: [],
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
	// Esquema de validación para el tercer paso
	yup.object().shape({
		sucursales: yup
			.array()
			.of(
				yup.object().shape({
					id: yup.string().required(),
					nombre: yup.string().required(),
				})
			)
			.required("Debe seleccionar al menos una sucursal"),
	}),
	// Esquema de validación para el cuarto paso (imágenes)
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
		label: "Sucursales",
		isSubstep: false,
		fields: <InsumoStep3 />,
	},
	{
		number: 4,
		icon: 4,
		label: "Agregar Imagen",
		isSubstep: false,
		fields: <ImageStep />,
	},
];
