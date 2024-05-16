import { Stack, TextField } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object({
	productName: Yup.string().required("Required"),
	description: Yup.string().required("Required"),
	category: Yup.string().required("Required"),
	price: Yup.number().required("Required"),
});

export const ProductFormStep1 = (props: any) => {
	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="Nombre"
				name="name"
				label="Nombre del Producto"
				onChange={props.handleChange}
				variant="outlined"
			/>
		</Stack>
	);
};
