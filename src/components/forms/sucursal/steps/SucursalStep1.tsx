import {
	Checkbox,
	Divider,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";

export const SucursalStep1 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="nombre"
				name="nombre"
				label="Nombre de la Sucursal"
				value={values.nombre}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.nombre)}
				helperText={errors.nombre}
				variant="outlined"
			/>
			<Stack direction="row" spacing={1} justifyContent="space-between">
				<TextField
					label="Horario de Apertura"
					name="horarioApertura"
					type="text"
					value={values.horarioApertura}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.horarioApertura)}
					helperText={errors.horarioApertura}
				/>
				<Divider orientation="vertical" />
				<TextField
					label="Horario de Cierre"
					name="horarioCierre"
					type="text"
					value={values.horarioCierre}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.horarioCierre)}
					helperText={errors.horarioCierre}
				/>
			</Stack>
			<FormControlLabel
				control={
					<Checkbox
						onChange={handleChange}
						name="casaMatriz"
						color="primary"
						checked={values.casaMatriz}
					/>
				}
				label="Es Casa Matriz?"
				name="casaMatriz"
			/>
		</Stack>
	);
};
