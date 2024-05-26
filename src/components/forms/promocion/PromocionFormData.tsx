import * as yup from "yup";
import { Promocion } from "../../../types/Promocion";
import { FormStep } from "../FormStep";
import { ImageStep } from "../Image/ImageDropStep.tsx";
import { PromocionStep1 } from "./steps/PromocionStep1.tsx";
import { PromocionStep2 } from "./steps/PromocionStep2.tsx";
import { PromocionStep3 } from "./steps/PromocionStep3.tsx";
import { PromocionStep4 } from "./steps/PromocionStep4.tsx";

export const PromocionInitialValues: Promocion = {
	id: null,
	denominacion: "",
	fechaDesde: new Date(),
	fechaHasta: new Date(),
	horaDesde: "",
	horaHasta: "",
	descripcionDescuento: "",
	precioPromocional: 0,
	tipoPromocion: "",
	imagenes: [],
	sucursales: [],
	promocionDetalles: [],
};

export const PromocionValidationSchemas = [
	// Esquema de validación para el paso 1
	yup.object().shape({
		denominacion: yup.string().required("La denominación es requerida"),
		descripcion: yup.string().required("La descripción es requerida"),
		precioPromocional: yup
			.number()
			.required("El precio promocional es requerido"),
		tipoPromocion: yup.string().required("El tipo de promoción es requerido"),
	}),
	// Esquema de validación para el paso 2
	yup.object().shape({
		fechaDesde: yup.date().required("La fecha de inicio es requerida"),
		fechaHasta: yup.date().required("La fecha de fin es requerida"),
		horaDesde: yup.string().required("La hora de inicio es requerida"),
		horaHasta: yup.string().required("La hora de fin es requerida"),
	}),
	// Esquema de validación para el paso 3
	yup.object().shape({
		promocionDetalles: yup.array().of(
			yup.object().shape({
				articulo: yup.object().required("El artículo es requerido"),
				cantidad: yup.number().required("La cantidad es requerida"),
			})
		),
	}),
	// Esquema de validación para el paso 4
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
	// Esquema de validación para el paso 5
	yup.object().shape({
		imagenes: yup
			.array()
			.min(1, "Debes agregar al menos una imagen")
			.required("Las imágenes son requeridas"),
	}),
];

export const PromocionFormSteps: FormStep[] = [
	{
		number: 1,
		icon: 1,
		label: "Detalles de la Promoción",
		isSubstep: false,
		substeps: 2,
		fields: <PromocionStep1 />,
	},
	{
		number: 2,
		label: "Aplicar Desde ...",
		isSubstep: true,
		fields: <PromocionStep2 />,
	},
	{
		number: 3,
		label: "Aplicar a ...",
		isSubstep: true,
		fields: <PromocionStep3 />,
	},
	{
		number: 4,
		icon: 4,
		label: "Artículos",
		isSubstep: false,
		fields: <PromocionStep4 />,
	},
	{
		number: 5,
		icon: 5,
		label: "Agregar Imagen",
		isSubstep: false,
		fields: <ImageStep />,
	},
];
