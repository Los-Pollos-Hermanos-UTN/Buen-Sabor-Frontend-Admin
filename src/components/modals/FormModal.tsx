import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Chip, Divider, Stack } from "@mui/material";

import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

import { BackButton } from "../buttons/BackButton";
import { VerticalStepper } from "../stepper/VerticalStepper";
import { FormStep } from "../forms/FormStep";
import { Formik } from "formik";
import React from "react";
import { Sucursal } from "../../types/Sucursal";
import { postData } from "../../services/RequestExecutor";
import { Empresa } from "../../types/Empresa";
import { ArticuloManufacturado } from "../../types/Manufacturado";
import { ArticuloInsumo } from "../../types/Insumo";
import * as yup from "yup";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	borderRadius: "20px",
	boxShadow: 24,
	p: 5,
};

interface FormModalProps {
	title: string;
	substepDefault: boolean;
	open: boolean;
	width: number;
	height: number;
	initialValues:
		| Sucursal
		| Empresa
		| ArticuloManufacturado
		| ArticuloInsumo;
	validationSchemas: yup.AnySchema[];
	postUrl: string;
	steps: FormStep[];
	handleClose: () => void;
}

export function FormModal({
	title,
	substepDefault,
	open,
	width,
	height,
	initialValues,
	validationSchemas,
	postUrl,
	steps,
	handleClose,
}: FormModalProps) {
	const [activeStep, setActiveStep] = useState<number>(substepDefault ? 1 : 0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(substepDefault ? 1 : 0);
	};

	const isLastStep = () => {
		return activeStep === steps.length - 1;
	};

	const handleSubmit = async (values: any) => {
		console.log({ values });
		if (values.domicilio) {
			values.domicilio = null;
		}
		if (!isLastStep()) {
			handleNext();
			return;
		}
		try {
			const response = await postData(postUrl, values);
			console.log({ response });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						...style,
						width: width ? width : 800,
						height: height ? height : 550,
					}}
				>
					<Stack
						direction="row"
						width="100%"
						height="15%"
						justifyContent="space-between"
						alignItems="center"
					>
						<Stack direction="row" spacing={2} alignItems="center">
							<BackButton onClick={handleClose} />
							<Typography variant="h6">{title}</Typography>
							<Chip
								label="En Progreso"
								variant="filled"
								sx={{
									borderRadius: 1,
									color: "#49111C",
									height: "25px",
								}}
							/>
						</Stack>
						<FastfoodOutlinedIcon />
					</Stack>
					<Divider />
					<Stack direction="row" width="100%" height="85%" mt="4%">
						<Stack width="30%" height="100%">
							<VerticalStepper
								steps={steps}
								activeStep={activeStep}
								handleReset={handleReset}
							/>
						</Stack>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchemas[activeStep]}
							onSubmit={async (values, _actions) => {
								try {
									await handleSubmit(values);
								} catch (ex: any) {}
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
								setFieldValue,
							}) => (
								<Stack width="70%" height="100%" direction="column">
									<Stack height="90%">
										{
											<>
												{steps[activeStep] && steps[activeStep].fields ? (
													React.cloneElement(steps[activeStep].fields, {
														values,
														errors,
														touched,
														handleChange,
														handleBlur,
														handleSubmit,
														isSubmitting,
														setFieldValue,
													})
												) : (
													<></>
												)}
											</>
										}
									</Stack>
									<Stack
										direction="row"
										alignContent="center"
										mb="5%"
										justifyContent="space-between"
										spacing={4}
									>
										<Button
											disabled={
												activeStep === 0 || (activeStep === 1 && substepDefault)
											}
											onClick={handleBack}
											startIcon={<ChevronLeftOutlinedIcon />}
											sx={{ textTransform: "none", color: "#A9927D" }}
										>
											Volver
										</Button>
										<Button
											variant="contained"
											type="submit"
											onClick={(event) => {
												console.log(errors);
												
												event.preventDefault();
												handleSubmit();
											}}
											sx={{
												width: "80%",
												textTransform: "none",
												backgroundColor: "#49111C",
												"&:hover": {
													backgroundColor: "#49111C",
												},
											}}
										>
											{isLastStep() ? (
												<Typography>Finalizar</Typography>
											) : (
												<Typography>Continuar</Typography>
											)}
										</Button>
									</Stack>
								</Stack>
							)}
						</Formik>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
}
