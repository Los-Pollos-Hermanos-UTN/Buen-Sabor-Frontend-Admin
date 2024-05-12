import { FormStep } from "../FormStep";
import { ProductPreview } from "./steps/ProductPreview";
import { ProductFormStep1 } from "./steps/ProductStep1";
import { ProductFormStep2 } from "./steps/ProductStep2";
import { ProductFormStep3 } from "./steps/ProductStep3";
import { ProductFormStep4 } from "./steps/ProductStep4";

export const ProductFormSteps: FormStep[] = [
	{
		number: 1,
		icon: 1,
		label: "Detalles del Producto",
		isSubstep: false,
		substeps: 2,
		fields: <> Si lees esto es xq se rompio :) </>,
	},
	{
		number: 2,
		label: "Nombre y Descripción",
		isSubstep: true,
		fields: <ProductFormStep1 />,
	},
	{
		number: 3,
		label: "Características",
		isSubstep: true,
		fields: <ProductFormStep2 />,
	},
	{
		number: 4,
		icon: 2,
		label: "Ingredientes",
		isSubstep: false,
		fields: <ProductFormStep3 />,
	},
	{
		number: 5,
		icon: 3,
		label: "Fotos",
		isSubstep: false,
		fields: <ProductFormStep4 />,
	},
	{
		number: 6,
		icon: 4,
		label: "Vista Previa",
		isSubstep: false,
		fields: <ProductPreview />,
	},
];
