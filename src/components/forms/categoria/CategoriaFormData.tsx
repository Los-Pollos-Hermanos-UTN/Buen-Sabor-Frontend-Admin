import { Categoria } from "../../../types/Categoria";
import { FormStep } from "../FormStep";
import { CategoriaStep1 } from "./steps/CategoriaStep1";
import * as yup from "yup";

export const CategoriaInitialValues: Categoria = {
	denominacion: "",
	subCategorias: [],
	sucursales: [],
	padreId: null,
};

export const CategoriaValidationSchemas = [
	yup.object().shape({
		// Esquema de validación para el primer paso
		denominacion: yup
			.string()
			.required("La denominación de la categoría es requerida"),
		sucursales: yup
			.array()
			.of(
				yup.object().shape({
					id: yup.string().required(),
					nombre: yup.string().required(),
				})
			)
			.required("Debe seleccionar al menos una sucursal"),
		padreId: yup.string().nullable(),
	}),
];

export const CategoriaFormSteps: FormStep[] = [
	{
		number: 1,
		icon: 1,
		label: "Datos de la Categoría",
		isSubstep: false,
		fields: <CategoriaStep1 />,
	},
];
