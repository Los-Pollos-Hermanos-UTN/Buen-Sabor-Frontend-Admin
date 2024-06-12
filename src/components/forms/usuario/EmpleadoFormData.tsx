import dayjs from "dayjs";
import { Empleado } from "../../../types/Empleado";
import * as yup from "yup";
import { FormStep } from "../FormStep";
import { ImageStep } from "../Image/ImageCarouselStep";
import { EmpleadoStep1 } from "./steps/EmpleadoStep1";
import { EmpleadoStep2 } from "./steps/EmpleadoStep2";

export const EmpleadoInitialValues: Empleado = {
	id: null,
	eliminado: false,
	tipoEmpleado: "ADMIN",
	nombre: "",
	apellido: "",
	telefono: "",
	email: "",
	fechaNacimiento: dayjs().format("YYYY-MM-DD"),
	usuarioEmpleado: {
		id: null,
		eliminado: false,
		auth0Id: "12345",
		userName: "",
	},
	imagenes: "",
	pedidos: [],
	sucursal: null,
};

export const EmpleadoValidationSchemas = [
	// Esquema de validación para el paso 1
	yup.object().shape({
		tipoEmpleado: yup.string().required("El tipo de empleado es requerido"),
		nombre: yup.string().required("El nombre es requerido"),
		apellido: yup.string().required("El apellido es requerido"),
		telefono: yup.string().required("El teléfono es requerido"),
		email: yup
			.string()
			.email("Debe ser un email válido")
			.required("El email es requerido"),
		fechaNacimiento: yup
			.string()
			.required("La fecha de nacimiento es requerida"),
	}),
	// Esquema de validación para el paso 2
	yup.object().shape({
		usuarioEmpleado: yup.object().shape({
			auth0Id: yup.string().required("El ID de Auth0 es requerido"),
			userName: yup.string().required("El nombre de usuario es requerido"),
		}),
	}),
	// Esquema de validación para el paso 3
	yup.object().shape({
		sucursal: yup.object().shape({
			id: yup.number().required("La sucursal es requerida"),
		}),
	}),
];

export const EmpleadoFormSteps: FormStep[] = [
	{
		number: 1,
		icon: 1,
		label: "Datos del Empleado",
		isSubstep: false,
		substeps: 0,
		fields: <EmpleadoStep1 />,
	},
	{
		number: 2,
		icon: 2,
		label: "Usuario y Sucursal",
		isSubstep: false,
		substeps: 0,
		fields: <EmpleadoStep2 />,
	},
	{
		number: 2,
		icon: 2,
		label: "Imagen",
		isSubstep: false,
		substeps: 0,
		fields: <ImageStep maxImages={1}/>,
	},
];
