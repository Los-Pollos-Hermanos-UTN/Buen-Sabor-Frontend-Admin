import { FormStep } from "../FormStep";
import { ProductFormStep1 } from "./steps/ProductStep1";
import { ProductFormStep2 } from "./steps/ProductStep2";
import { ProductFormStep3 } from "./steps/ProductStep3";

export const ProductFormSteps: FormStep[] = [
	{
		number: 1,
		label: "Detalles del Producto",
		isSubstep: false,
		fields: <> Esto debe redirigir al primer substep </>,
	},
	{ label: "Nombre y Descripción", isSubstep: true, fields: <ProductFormStep1 /> },
	{ label: "Variantes", isSubstep: true, fields: <ProductFormStep2 /> },
	{
		number: 2,
		label: "Fotos",
		isSubstep: false,
		fields: <ProductFormStep3 />,
	},
	{
		number: 3,
		label: "Vista Previa",
		isSubstep: false,
		fields: <> Falta vista previa </>,
	},
];
