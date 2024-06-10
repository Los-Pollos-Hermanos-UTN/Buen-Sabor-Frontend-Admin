import { Empresa } from "../../../types/Empresa";
import { FormStep } from "../FormStep";
import { ImageStep } from "../Image/ImageCarouselStep";
import { EmpresaStep1 } from "./steps/EmpresaStep1";
import * as yup from "yup";

export const EmpresaInitialValues: Empresa = {
	id: undefined,
	eliminado: false,
	nombre: "",
	razonSocial: "",
	cuil: "",
	imagenes: ""
};

export const EmpresaValidationSchemas = [
	yup.object().shape({
		eliminado: yup.boolean().required(),
		nombre: yup.string().required("El nombre de la empresa es requerido"),
		razonSocial: yup
			.string()
			.required("La razón social de la empresa es requerida"),
		cuil: yup
			.string()
			.length(11, "El CUIL debe tener 11 caracteres")
			.required("El CUIL de la empresa es requerido"),
		sucursales: yup.array(),
	}),
];

export const EmpresaFormSteps: FormStep[] = [
	{
		number: 1,
		icon: 1,
		label: "Detalles de la Empresa",
		isSubstep: false,
		fields: <EmpresaStep1 />,
	},
	{
		number: 2,
		icon: 2,
		label: "Logo",
		isSubstep: false,
		fields: <ImageStep maxImages={1} />,
	},
];
