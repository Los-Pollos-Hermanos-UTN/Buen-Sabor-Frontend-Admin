import { Sucursal } from "../../../types/Sucursal";
import { FormStep } from "../FormStep";
import { SucursalStep1 } from "./steps/SucursalStep1";
import { SucursalStep2 } from "./steps/SucursalStep2";

export const SucursalesInitialValues: Sucursal = {
	id: undefined,
	eliminado: false,
	nombre: "",
	horarioApertura: "",
	horarioCierre: "",
	casaMatriz: false,
	domicilio: {
		calle: "",
		numero: 0,
		cp: 0,
		piso: undefined,
		nroDepto: undefined,
		localidad: {
			nombre: "",
			provincia: {
				nombre: "",
				pais: {
					nombre: "",
				},
			},
		},
	},
	empresa: {
		id: "4",
		eliminado: false,
		nombre: "Los Pollos Hermanos",
		razonSocial: "Solo Existo",
		cuil: "54321",
	},
	promociones: [],
	categorias: [],
	empleados: [],
};

export const SucursalFormSteps: FormStep[] = [
	{
		number: 1,
		icon: 1,
		label: "Detalles de la Sucursal",
		isSubstep: false,
		fields: <SucursalStep1 />,
	},
	{
		number: 2,
		icon: 2,
		label: "Ubicación",
		isSubstep: false,
		fields: <SucursalStep2 />,
	},
];
