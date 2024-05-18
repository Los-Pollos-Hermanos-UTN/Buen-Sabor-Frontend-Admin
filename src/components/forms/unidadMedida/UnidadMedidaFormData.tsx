import { UnidadMedida } from "../../../types/UnidadMedida"; // Asegúrate de tener este tipo definido en tu proyecto
import { FormStep } from "../FormStep";
import { UnidadMedidaStep1 } from "./steps/UnidadMedidaStep1";
import * as yup from "yup";

export const UnidadMedidaInitialValues: UnidadMedida = {
    id: null,
    eliminado: false,
    denominacion: "",
};

export const UnidadMedidaValidationSchemas = [
    yup.object().shape({
        denominacion: yup
            .string()
            .required("La denominación es requerida"),
        eliminado: yup.boolean().required(),
    }),
];

export const UnidadMedidaFormSteps: FormStep[] = [
    {
        number: 1,
        icon: 1,
        label: "Detalles",
        isSubstep: false,
        fields: <UnidadMedidaStep1 />,
    },
];
