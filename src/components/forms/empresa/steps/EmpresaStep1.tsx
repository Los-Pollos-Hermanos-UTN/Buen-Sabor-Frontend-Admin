import {
	Stack,
	TextField,
} from "@mui/material";

export const EmpresaStep1 = (props: any) => {
	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="Nombre"
				name="nombre"
				label="Nombre de la Empresa"
				onChange={props.handleChange}
				variant="outlined"
			/>
			<TextField
				label="Razón Social"
				name="razonSocial"
				type="text"
				onChange={props.handleChange}
			/>
			<TextField
				label="Cuil"
				name="cuil"
				type="text"
				onChange={props.handleChange}
			/>
		</Stack>
	);
};
