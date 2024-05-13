import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
	Button,
	Chip,
	Divider,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material";

import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";

import { BackButton } from "../buttons/BackButton";
import { VerticalStepper } from "../stepper/VerticalStepper";
import { FormStep } from "../forms/FormStep";
import { Sucursal } from "../../types/Sucursal";
import { Formik } from "formik";

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
	substepDefault: boolean;
	open: boolean;
	width: number;
	height: number;
	steps: FormStep[];
	handleClose: () => void;
}

export function ModalSucursal({
	substepDefault,
	open,
	width,
	height,
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

	const handleSubmit = async (values: any) => {
		console.log({ values });
        try {
			const response = await fetch('http://localhost:8080/sucursal/short', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			});
			
			if (!response.ok) {
				throw new Error('Error en la petición');
			}

			const data = await response.json();
			console.log({data});
		} catch (ex: any) {
			console.error(ex);
		}
	};

	const initialValues: Sucursal = {
		nombre: "",
		horarioApertura: "",
		horarioCierre: "",
		esCasaMatriz: false,
		direccion: {
			calle: "",
			numero: 0,
			cp: 0,
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
			name: "",
			branchs: [],
		},
	};
	const localidades = [
		{ id: 1, nombre: "Luján de Cuyo" },
		{ id: 2, nombre: "Godoy Cruz" },
		{ id: 3, nombre: "Guaymallén" },
	];
	const provincias = [
		{ id: 1, nombre: "Mendoza" },
		{ id: 2, nombre: "Buenos Aires" },
		{ id: 3, nombre: "Córdoba" },
	];
	const paises = [{ id: 1, nombre: "Argentina" }];
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
							<Typography variant="h6">Agregar Sucursal</Typography>
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
						<Stack width="70%" height="100%" direction="column">
							<Stack height="90%">
								<Formik
									initialValues={initialValues}
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
									}) => (
										<Stack spacing={3}>
											<TextField
												label="Nombre"
												name="nombre"
												type="text"
												placeholder="Nombre"
												value={values["nombre"]}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											<Stack
												direction="row"
												spacing={1}
												justifyContent="space-between"
											>
												<TextField
													label="Horario de Apertura"
													name="horarioApertura"
													type="text"
													placeholder="Horario de Apertura"
													value={values["horarioApertura"]}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<Divider orientation="vertical" />
												<TextField
													label="Horario de Cierre"
													name="horarioCierre"
													type="text"
													placeholder="Horario de Cierre"
													value={values["horarioCierre"]}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
											</Stack>
											<TextField
												label="Es casa matriz?"
												name="esCasaMatriz"
												type="checkbox"
												placeholder="Es Casa Matriz"
												value={values["esCasaMatriz"]}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											<Stack
												direction="row"
												spacing={1}
												justifyContent="space-between"
											>
												<TextField
													label="Calle"
													name="direccion.calle"
													placeholder="Calle"
													value={values.direccion.calle}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<TextField
													label="Código Postal"
													name="direccion.cp"
													placeholder="Código Postal"
													value={values.direccion.cp}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<TextField
													label="Número"
													name="direccion.numero"
													placeholder="Número de Calle"
													value={values.direccion.numero}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
											</Stack>
											<Stack direction="row" spacing={1}>
												<Select
													fullWidth
													name="direccion.localidad.nombre"
													value={values.direccion.localidad.nombre}
													onChange={handleChange}
												>
													{localidades.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option.nombre}
														</MenuItem>
													))}
												</Select>
												<Select
													fullWidth
													name="direccion.localidad.provincia.nombre"
													value={values.direccion.localidad.provincia.nombre}
													onChange={handleChange}
												>
													{provincias.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option.nombre}
														</MenuItem>
													))}
												</Select>
												<Select
													fullWidth
													name="direccion.localidad.provincia.pais.nombre"
													value={
														values.direccion.localidad.provincia.pais.nombre
													}
													onChange={handleChange}
												>
													{paises.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option.nombre}
														</MenuItem>
													))}
												</Select>
											</Stack>

											<Button
												type="submit"
												onClick={(event) => {
													event.preventDefault();
													handleSubmit();
												}}
												variant="contained"
												sx={{
													width: "50%",
													textTransform: "none",
													backgroundColor: "#49111C",
													"&:hover": {
														backgroundColor: "#49111C",
													},
												}}
											>
												Enviar
											</Button>
										</Stack>
									)}
								</Formik>
							</Stack>
						</Stack>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
}
