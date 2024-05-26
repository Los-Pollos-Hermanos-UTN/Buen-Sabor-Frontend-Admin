import React, { useEffect } from "react";
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
import {
	postData,
	postFormData,
	putData,
	putFormData,
} from "../../services/RequestExecutor";
import * as yup from "yup";
import { Loader } from "../shared/Loader";

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
	initialValues: any;
	validationSchemas: yup.AnySchema[];
	postUrl: string;
	putUrl?: string;
	isEdit?: boolean;
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
	putUrl,
	isEdit,
	steps,
	handleClose,
}: FormModalProps) {
	const [activeStep, setActiveStep] = React.useState<number>(
		substepDefault ? 1 : 0
	);

	useEffect(() => {
		if (open) {
			handleReset();
		}
	}, [open]);

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
		console.log("Submitting:", { values });		
		if (!isLastStep()) {
			handleNext();
			return;
		}
		try {
			let response;
			if (values && values.imagenes) {
				response = isEdit
					? await putFormData(putUrl!, values, values.imagenes)
					: await postFormData(postUrl, values, values.imagenes);
			} else {
				response = isEdit
					? await putData(putUrl!, values)
					: await postData(postUrl, values);
			}

			console.log({ response });
			handleClose();
			handleReset();
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
						<Stack
							direction="row"
							spacing={2}
							alignItems="center"
							mb={height === 300 ? "5%" : ""}
						>
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
							validateOnBlur={false} // No validar por cada blur
							validateOnChange={false} // No validar por cada cambio
							onSubmit={async (values, _actions) => {
								try {
									await handleSubmit(values);
								} catch (ex: any) {
									/* empty */
								}
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
								validateForm, // Función para validar el formulario
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
											type="button"
											onClick={async (event) => {
												event.preventDefault();
												const formErrors = await validateForm();
												if (Object.keys(formErrors).length === 0) {
													handleSubmit();
												} else {
													console.log({ errors: formErrors });
												}
											}}
											startIcon={isSubmitting && <Loader />}
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
