import {
	Autocomplete,
	Checkbox,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { getConstants } from "../../../../constants/constants";
import { useState, useEffect } from "react";
import { getData } from "../../../../services/RequestExecutor";
import { Sucursal } from "../../../../types/Sucursal";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const EmpleadoStep2 = (props: any) => {
	const CONSTANTS = getConstants();
	const { values, errors, handleChange, handleBlur, setFieldValue } = props;

	const [sucursales, setSucursales] = useState<Sucursal[]>([]);

	useEffect(() => {
		const getSucursales = async () => {
			try {
				const response = await getData<Sucursal[]>(CONSTANTS.sucursal.getUrl);
				setSucursales(response);
			} catch (error) {
				console.error(error);
			}
		};
		getSucursales();
	}, []);

	const handleSucursalChange = (_: any, value: Sucursal | null) => {
		setFieldValue("sucursal", value || null);
	};

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="usuarioEmpleado.userName"
				name="usuarioEmpleado.userName"
				label="Nombre de usuario"
				value={values.usuarioEmpleado?.userName}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.usuarioEmpleado?.userName)}
				helperText={errors.usuarioEmpleado?.userName}
			/>
			<Typography variant="h6">Sucursal del Empleado?</Typography>
			<Autocomplete
				options={sucursales}
				getOptionLabel={(option) => option.nombre}
				value={values.sucursal || null}
				onChange={handleSucursalChange}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Sucursal"
						variant="outlined"
						error={Boolean(errors.sucursal)}
						helperText={errors.sucursal && "Seleccione una sucursal"}
					/>
				)}
			/>
			
		</Stack>
	);
};
