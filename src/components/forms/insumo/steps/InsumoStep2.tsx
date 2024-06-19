import { Stack, TextField, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";
import { getConstants } from "../../../../constants/constants";
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
	const CONSTANTS = getConstants();
	const { values, errors, handleChange, handleBlur, setFieldValue } = props;

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
	}, [open]);

	useEffect(() => {
		if (!values.esParaElaborar) {
			const unidad = unidadesMedida.find(
				(unidad) => unidad.denominacion === "Unidad"
			);
			if (unidad) {
				setFieldValue("unidadMedida", unidad);
			}
		}
	}, [values.esParaElaborar, unidadesMedida, setFieldValue]);

	const handleUnidadMedidaChange = (_: any, value: UnidadMedida | null) => {
		setFieldValue(
			"unidadMedida",
			value || { id: null, eliminado: false, denominacion: "" }
		);
	};

	return (
		<>
			<Stack spacing={2}>
				{values.esParaElaborar ? (
					<Stack direction="row" spacing={3} alignItems="center">
						<Autocomplete
							options={unidadesMedida}
							getOptionLabel={(option) => option.denominacion}
							value={values.unidadMedida || null}
							onChange={handleUnidadMedidaChange}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Unidad de Medida"
									variant="outlined"
									error={Boolean(errors.unidadMedida)}
									helperText={
										errors.unidadMedida && "Seleccione una unidad de medida"
									}
								/>
							)}
							sx={{ width: "calc(100% - 48px)" }}
						/>
						<AddButton handleClick={handleOpen} />
					</Stack>
				) : (
					<TextField
						fullWidth
						id="unidadMedida"
						name="unidadMedida"
						label="Unidad de Medida"
						value="Unidad"
						disabled
						variant="outlined"
					/>
				)}

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
