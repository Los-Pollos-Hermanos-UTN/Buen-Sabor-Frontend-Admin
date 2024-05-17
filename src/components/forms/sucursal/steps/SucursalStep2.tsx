import { MenuItem, Select, Stack, TextField } from "@mui/material";

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

export const SucursalStep2 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

	return (
		<Stack spacing={2}>
			<Stack direction="row" spacing={1} justifyContent="space-between">
				<TextField
					label="Calle"
					name="domicilio.calle"
					value={values.domicilio.calle}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.calle)}
					helperText={errors.domicilio?.calle}
				/>
				<TextField
					label="Código Postal"
					name="domicilio.cp"
					value={values.domicilio.cp}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.cp)}
					helperText={errors.domicilio?.cp}
				/>
				<TextField
					label="Número de Calle"
					name="domicilio.numero"
					value={values.domicilio.numero}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.numero)}
					helperText={errors.domicilio?.numero}
				/>
			</Stack>
			<Stack direction="row" spacing={1}>
				<Select
					fullWidth
					name="domicilio.localidad.nombre"
					value={values.domicilio.localidad.nombre}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.localidad?.nombre)}
				>
					{localidades.map((option, index) => (
						<MenuItem key={index} value={option.nombre}>
							{option.nombre}
						</MenuItem>
					))}
				</Select>
				<Select
					fullWidth
					name="domicilio.localidad.provincia.nombre"
					value={values.domicilio.localidad.provincia.nombre}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.localidad?.provincia?.nombre)}
				>
					{provincias.map((option, index) => (
						<MenuItem key={index} value={option.nombre}>
							{option.nombre}
						</MenuItem>
					))}
				</Select>
				<Select
					fullWidth
					name="domicilio.localidad.provincia.pais.nombre"
					value={values.domicilio.localidad.provincia.pais.nombre}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.localidad?.provincia?.pais?.nombre)}
				>
					{paises.map((option, index) => (
						<MenuItem key={index} value={option.nombre}>
							{option.nombre}
						</MenuItem>
					))}
				</Select>
			</Stack>
		</Stack>
	);
};
