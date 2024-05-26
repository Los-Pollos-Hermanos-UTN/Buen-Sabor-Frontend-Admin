import {
	Stack,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";

export const PromocionStep1 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

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
				multiline
				maxRows={3}
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
		</Stack>
	);
};
