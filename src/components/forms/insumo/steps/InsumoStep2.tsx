import {
	Stack,
	TextField,
	Checkbox,
	FormControlLabel,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../constants/constants";
import { getData } from "../../../../services/RequestExecutor";
import { UnidadMedida } from "../../../../types/UnidadMedida";
import { AddButton } from "../../../buttons/AddButton";
import { FormModal } from "../../../modals/FormModal";
import {
	UnidadMedidaFormSteps,
	UnidadMedidaInitialValues,
	UnidadMedidaValidationSchemas,
} from "../../unidadMedida/UnidadMedidaFormData";

export const InsumoStep2 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);

	useEffect(() => {
		const getUnidadesMedida = async () => {
			try {
				const response = await getData<UnidadMedida[]>(
					CONSTANTS.unidadMedida.getUrl
				);
				setUnidadesMedida(response);
			} catch (error) {
				console.error(error);
			}
		};
		getUnidadesMedida();
	}, []);

	return (
		<>
			<Stack spacing={2}>
				<Stack direction="row" spacing={3} alignItems="center">
					<FormControl fullWidth>
						<InputLabel id="unidad-medida-label">Unidad de Medida</InputLabel>
						<Select
							labelId="unidad-medida-label"
							id="unidad-medida-select"
							value={values.unidadMedida}
							label="Unidad de Medida"
							onChange={handleChange("unidadMedida")}
						>
							{unidadesMedida.map((unidad) => (
								<MenuItem key={unidad.id} value={unidad as any}>
									{/* Uso el "as any" porque sino da warning por no cumplir con
									los tipos preestablecidos */}
									{unidad.denominacion}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<AddButton handleClick={handleOpen} />
				</Stack>

				<TextField
					fullWidth
					id="stockActual"
					name="stockActual"
					label="Stock Actual"
					type="number"
					value={values.stockActual}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.stockActual)}
					helperText={errors.stockActual}
					variant="outlined"
				/>
				<TextField
					fullWidth
					id="stockMaximo"
					name="stockMaximo"
					label="Stock Máximo"
					type="number"
					value={values.stockMaximo}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.stockMaximo)}
					helperText={errors.stockMaximo}
					variant="outlined"
				/>
				<FormControlLabel
					control={
						<Checkbox
							onChange={handleChange}
							name="esParaElaborar"
							color="primary"
							checked={values.esParaElaborar}
						/>
					}
					label="Es Para Elaborar?"
					name="esParaElaborar"
				/>
			</Stack>
			<FormModal
				title={"Agregar Unidad de Medida"}
				open={open}
				handleClose={handleClose}
				width={600}
				height={300}
				initialValues={UnidadMedidaInitialValues}
				validationSchemas={UnidadMedidaValidationSchemas}
				postUrl={CONSTANTS.unidadMedida.postURL}
				steps={UnidadMedidaFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
