import { Empresa } from "../../../types/Empresa";
import { FormStep } from "../FormStep";
import { EmpresaStep1 } from "./steps/EmpresaStep1";
import * as yup from "yup";

export const EmpresaInitialValues: Empresa = {
	id: undefined,
	eliminado: false,
	nombre: "",
	razonSocial: "",
	cuil: "",
	sucursales: [],
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
			.length(13, "El CUIL debe tener 13 caracteres")
			.matches(/^\d{2}-\d{8}-\d$/, "El formato del CUIL no es válido")
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
];
