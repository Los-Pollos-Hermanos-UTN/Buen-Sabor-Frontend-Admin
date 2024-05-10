import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";

import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";

import { FormStep } from "../forms/FormStep";
import { StepperIcon, SubStepperIcon } from "./StepperIcons";

interface VerticalStepperProps {
	steps: FormStep[];
	activeStep: number;
	handleReset: () => void;
}

export function VerticalStepper({
	steps,
	activeStep,
	handleReset,
}: VerticalStepperProps) {
	return (
		<Box sx={{ maxWidth: 400 }}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.flatMap((step, index) => [
					<Step
						completed={
							step.substeps
								? activeStep >= step.number + step.substeps
								: activeStep > index
						}
						key={step.label}
					>
						<StepLabel
							StepIconComponent={(props) => {
								if (step.isSubstep)
									return (
										<SubStepperIcon
											activeStep={activeStep}
											index={index}
											step={step}
											props={props}
										/>
									);
								else
									return (
										<StepperIcon
											activeStep={activeStep}
											index={index}
											step={step}
											props={props}
										/>
									);
							}}
						>
							{step.label}
						</StepLabel>
						<StepContent></StepContent>
					</Step>,
				])}
			</Stepper>
			{activeStep === steps.length -1 && (
				<Button
					onClick={handleReset}
					startIcon={<RotateLeftOutlinedIcon />}
					sx={{ mt: 1, mr: 1, textTransform: "none", color: "#A9927D" }}
				>
					Resetear
				</Button>
			)}
		</Box>
	);
}
