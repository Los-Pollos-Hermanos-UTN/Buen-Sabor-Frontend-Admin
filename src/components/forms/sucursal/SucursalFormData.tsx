import { Sucursal } from "../../../types/Sucursal";
import { FormStep } from "../FormStep";
import { SucursalStep1 } from "./steps/SucursalStep1";
import { SucursalStep2 } from "./steps/SucursalStep2";
import * as yup from "yup";

export const SucursalInitialValues: Sucursal = {
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

export const SucursalValidationSchemas = [
	yup.object().shape({
		eliminado: yup.boolean().required(),
		nombre: yup.string().required("El nombre de la sucursal es requerido"),
		horarioApertura: yup
			.string()
			.required("El horario de apertura es requerido"),
		horarioCierre: yup.string().required("El horario de cierre es requerido"),
		casaMatriz: yup.boolean().required(),
	}),
	yup.object().shape({
		empresa: yup.object().shape({
			id: yup.string().required(),
			eliminado: yup.boolean().required(),
			nombre: yup.string().required(),
			razonSocial: yup.string().required(),
			cuil: yup.string().required(),
		}),
		promociones: yup.array().nullable(),
		categorias: yup.array().nullable(),
		domicilio: yup.object().shape({
			calle: yup.string().required("La calle es requerida"),
			numero: yup.number().required("El número es requerido"),
			cp: yup.number().required("El código postal es requerido"),
			piso: yup.number().nullable(),
			nroDepto: yup.number().nullable(),
			localidad: yup.object().shape({
				nombre: yup.string().required("La localidad es requerida"),
				provincia: yup.object().shape({
					nombre: yup.string().required("La provincia es requerida"),
					pais: yup.object().shape({
						nombre: yup.string().required("El país es requerido"),
					}),
				}),
			}),
		}),
	}),
];

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
