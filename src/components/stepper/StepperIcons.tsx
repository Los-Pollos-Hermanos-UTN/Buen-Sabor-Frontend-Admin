import { StepIcon } from "@mui/material";

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
				color: getColor(activeStep, index),
			}}
			icon={step.number}
		/>
	);
};

export const SubStepperIcon = ({ activeStep, index }: StepperIconProps) => {
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
					backgroundColor: getColor(activeStep, index),
				}}
			></div>
		</div>
	);
};

const getColor = (activeStep: number, index: number) => {
	return activeStep < index
		? "#C4C4C4"
		: activeStep === index
		? "#49111C"
		: activeStep > index
		? "#31E77A"
		: "";
};
