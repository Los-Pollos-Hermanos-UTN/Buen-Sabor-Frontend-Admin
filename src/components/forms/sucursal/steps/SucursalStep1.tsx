import {
	Checkbox,
	Divider,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";

export const SucursalStep1 = (props: any) => {
	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="Nombre"
				name="nombre"
				label="Nombre de la Sucursal"
				onChange={props.handleChange}
				variant="outlined"
			/>
			<Stack direction="row" spacing={1} justifyContent="space-between">
				<TextField
					label="Horario de Apertura"
					name="horarioApertura"
					type="text"
					onChange={props.handleChange}
				/>
				<Divider orientation="vertical" />
				<TextField
					label="Horario de Cierre"
					name="horarioCierre"
					type="text"
					onChange={props.handleChange}
				/>
			</Stack>
			<Stack width="40%">
				<FormControlLabel
					control={
						<Checkbox
							onChange={props.handleChange}
							name="casaMatriz"
							color="primary"
							sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
						/>
					}
					label="Es Casa Matriz?"
					name="casaMatriz"
				/>
			</Stack>
		</Stack>
	);
};
