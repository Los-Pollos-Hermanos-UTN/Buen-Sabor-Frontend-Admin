import { Empresa } from "../../../types/Empresa";
import { FormStep } from "../FormStep";
import { EmpresaStep1 } from "./steps/EmpresaStep1";

export const EmpresaInitialValues: Empresa = {
	id: undefined,
	eliminado: false,
	nombre: "",
	razonSocial: "",
	cuil: "",
	sucursales: [],
};

export const EmpresaFormSteps: FormStep[] = [
	{
		number: 1,
		icon: 1,
		label: "Detalles de la Empresa",
		isSubstep: false,
		fields: <EmpresaStep1 />,
	},
];
