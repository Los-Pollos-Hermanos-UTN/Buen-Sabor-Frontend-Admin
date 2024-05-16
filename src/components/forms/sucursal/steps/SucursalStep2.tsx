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
	return (
		<Stack spacing={2}>
			<Stack direction="row" spacing={1} justifyContent="space-between">
				<TextField
					label="Calle"
					name="domicilio.calle"
					onChange={props.handleChange}
				/>
				<TextField
					label="Código Postal"
					name="domicilio.cp"
					onChange={props.handleChange}
				/>
				<TextField
					label="Número de Calle"
					name="domicilio.numero"
					onChange={props.handleChange}
				/>
			</Stack>
			<Stack direction="row" spacing={1}>
				<Select
					fullWidth
					name="domicilio.localidad.nombre"
					onChange={props.handleChange}
				>
					{localidades.map((option, index) => (
						<MenuItem key={index} value={option}>
							{option.nombre}
						</MenuItem>
					))}
				</Select>
				<Select
					fullWidth
					name="domicilio.localidad.provincia.nombre"
					onChange={props.handleChange}
				>
					{provincias.map((option, index) => (
						<MenuItem key={index} value={option}>
							{option.nombre}
						</MenuItem>
					))}
				</Select>
				<Select
					fullWidth
					name="domicilio.localidad.provincia.pais.nombre"
					onChange={props.handleChange}
				>
					{paises.map((option, index) => (
						<MenuItem key={index} value={option}>
							{option.nombre}
						</MenuItem>
					))}
				</Select>
			</Stack>
		</Stack>
	);
};
