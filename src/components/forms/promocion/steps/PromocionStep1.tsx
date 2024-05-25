import {
	Autocomplete,
	Stack,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getConstants } from "../../../../constants/constants";
import { getData } from "../../../../services/RequestExecutor";
import { Sucursal } from "../../../../types/Sucursal";

export const PromocionStep1 = (props: any) => {
	const CONSTANTS = getConstants();
	const { values, errors, handleChange, handleBlur, setFieldValue } = props;
	const [sucursales, setSucursales] = useState<Sucursal[]>([]);

	useEffect(() => {
		const fetchSucursales = async () => {
			try {
				const sucursalesData = await getData<Sucursal[]>(
					CONSTANTS.sucursal.getUrl
				);
				setSucursales(sucursalesData);
			} catch (error) {
				console.error(error);
			}
		};
		fetchSucursales();
	}, []);

	const handleSucursalChange = (event: any, value: Sucursal | null) => {
		setFieldValue("sucursales", value ? [value] : []);
	};

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="denominacion"
				name="denominacion"
				label="Denominación de la Promoción"
				value={values.denominacion}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.denominacion)}
				helperText={errors.denominacion}
				variant="outlined"
			/>
			<TextField
				fullWidth
				id="descripcion"
				name="descripcion"
				label="Descripción"
				value={values.descripcion}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.descripcion)}
				helperText={errors.descripcion}
				variant="outlined"
			/>
			<TextField
				fullWidth
				id="precioPromocional"
				name="precioPromocional"
				label="Precio Promocional"
				type="number"
				value={values.precioPromocional}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.precioPromocional)}
				helperText={errors.precioPromocional}
				variant="outlined"
			/>
			<FormControl fullWidth variant="outlined">
				<InputLabel id="tipoPromocion-label">Tipo de Promoción</InputLabel>
				<Select
					labelId="tipoPromocion-label"
					id="tipoPromocion"
					name="tipoPromocion"
					value={values.tipoPromocion}
					onChange={handleChange}
					label="Tipo de Promoción"
					error={Boolean(errors.tipoPromocion)}
				>
					<MenuItem value="HAPPY_HOUR">Happy Hour</MenuItem>
					<MenuItem value="PROMOCION">Promoción</MenuItem>
				</Select>
			</FormControl>
			<Autocomplete
				fullWidth
				options={sucursales}
				getOptionLabel={(option) => option.nombre}
				value={
					sucursales.find((suc) => values.sucursales.includes(suc)) || null
				}
				onChange={handleSucursalChange}
				onBlur={handleBlur}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Sucursal"
						error={Boolean(errors.sucursales)}
						helperText={errors.sucursales}
					/>
				)}
			/>
		</Stack>
	);
};
