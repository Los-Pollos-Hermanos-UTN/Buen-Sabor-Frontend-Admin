import { Stack, TextField, FormControlLabel, Checkbox } from "@mui/material";

export const UnidadMedidaStep1 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="denominacion"
				name="denominacion"
				label="Denominación"
				value={values.denominacion}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.denominacion)}
				helperText={errors.denominacion}
				variant="outlined"
			/>
			{/* <FormControlLabel
				control={
					<Checkbox
						onChange={handleChange}
						name="eliminado"
						color="primary"
						checked={values.eliminado}
					/>
				}
				label="Eliminado"
				name="eliminado"
			/> */}
		</Stack>
	);
};
