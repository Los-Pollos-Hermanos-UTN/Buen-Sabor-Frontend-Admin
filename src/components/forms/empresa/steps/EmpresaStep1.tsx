import { Stack, TextField } from "@mui/material";

export const EmpresaStep1 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="nombre"
				name="nombre"
				label="Nombre de la Empresa"
				value={values.nombre}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.nombre)}
				helperText={errors.nombre}
				variant="outlined"
			/>
			<TextField
				fullWidth
				id="razonSocial"
				name="razonSocial"
				label="Razón Social"
				value={values.razonSocial}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.razonSocial)}
				helperText={errors.razonSocial}
				variant="outlined"
			/>
			<TextField
				fullWidth
				id="cuil"
				name="cuil"
				label="CUIL"
				value={values.cuil}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.cuil)}
				helperText={errors.cuil}
				variant="outlined"
			/>
		</Stack>
	);
};
