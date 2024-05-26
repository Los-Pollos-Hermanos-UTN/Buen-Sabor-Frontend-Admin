import { Stack, TextField, Divider } from "@mui/material";

export const PromocionStep2 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

	return (
		<Stack spacing={2}>
			<Stack direction="row" spacing={1} justifyContent="space-between">
				<TextField
					label="Fecha Desde"
					name="fechaDesde"
					type="text"
					value={values.fechaDesde}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.fechaDesde)}
					helperText={errors.fechaDesde}
				/>
				<Divider orientation="vertical" />
				<TextField
					label="Fecha Hasta"
					name="fechaHasta"
					type="text"
					value={values.fechaHasta}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.fechaHasta)}
					helperText={errors.fechaHasta}
				/>
			</Stack>
			<Stack direction="row" spacing={1} justifyContent="space-between">
				<TextField
					label="Horario Desde"
					name="horaDesde"
					type="text"
					value={values.horaDesde}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.horaDesde)}
					helperText={errors.horaDesde}
				/>
				<Divider orientation="vertical" />
				<TextField
					label="Horario Hasta"
					name="horaHasta"
					type="text"
					value={values.horaHasta}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.horaHasta)}
					helperText={errors.horaHasta}
				/>
			</Stack>
		</Stack>
	);
};
