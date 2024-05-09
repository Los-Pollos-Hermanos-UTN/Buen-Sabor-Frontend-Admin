import { StepIcon } from "@mui/material";
import { FormStep } from "../forms/FormStep";

interface StepperIconProps {
	activeStep: number;
	index: number;
	step: any;
	props: any;
}

export const StepperIcon = ({
	activeStep,
	index,
	step,
	props,
}: StepperIconProps) => {
	return (
		<StepIcon
			{...props}
			style={{
				color: getColor(step, activeStep, index),
			}}
			icon={step.icon}
		/>
	);
};


export const SubStepperIcon = ({
	step,
	activeStep,
	index,
}: StepperIconProps) => {
	return (
		// Este div anidado sirve para desplegar el icono centrado sin afectar la linea del stepper
		<div
			style={{
				width: "24px",
				height: "24px",
				borderRadius: "50%",
				backgroundColor: "transparent",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					width: "8px",
					height: "8px",
					borderRadius: "50%",
					backgroundColor: getColor(step, activeStep, index),
				}}
			></div>
		</div>
	);
};

const getColor = (step: FormStep, activeStep: number, index: number) => {
	if (activeStep < index) {
		return "#C4C4C4";
	}
	if (activeStep === index) {
		return "#49111C";
	}
	if (activeStep > index) {
		if ((step.substeps && step.number + step.substeps <= activeStep) || (!step.substeps)) {
			return "#31E77A";
		}
		return "#49111C";
	}
};
