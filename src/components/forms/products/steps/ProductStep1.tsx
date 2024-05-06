import { Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const inputStyles = {
	"& .MuiInputBase-input": {
		color: "#49111C",
	},
	"& .MuiOutlinedInput-root": {
		"&:hover fieldset": {
			borderColor: "#49111C",
		},
		"&.Mui-focused fieldset": {
			borderColor: "#49111C",
		},
	},
};

const validationSchema = Yup.object({
	productName: Yup.string().required("Required"),
	description: Yup.string().required("Required"),
	category: Yup.string().required("Required"),
	price: Yup.number().required("Required"),
});

const initialValues = {
	productName: "",
	description: "",
	category: "",
	price: "",
};

export const ProductFormStep1 = () => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Stack spacing={2}>
				<TextField
					fullWidth
					id="productName"
					name="productName"
					label="Nombre del Producto"
					value={formik.values.productName}
					onChange={formik.handleChange}
					error={
						formik.touched.productName && Boolean(formik.errors.productName)
					}
					helperText={formik.touched.productName && formik.errors.productName}
					variant="outlined"
					sx={inputStyles}
				/>
				<TextField
					fullWidth
					id="description"
					name="description"
					label="Descripcion"
					value={formik.values.description}
					onChange={formik.handleChange}
					error={
						formik.touched.description && Boolean(formik.errors.description)
					}
					helperText={formik.touched.description && formik.errors.description}
					sx={inputStyles}
				/>
				<TextField
					fullWidth
					id="category"
					name="category"
					label="Categoria"
					value={formik.values.category}
					onChange={formik.handleChange}
					error={formik.touched.category && Boolean(formik.errors.category)}
					helperText={formik.touched.category && formik.errors.category}
					sx={inputStyles}
				/>
				<TextField
					fullWidth
					id="price"
					name="price"
					label="Precio"
					value={formik.values.price}
					onChange={formik.handleChange}
					error={formik.touched.price && Boolean(formik.errors.price)}
					helperText={formik.touched.price && formik.errors.price}
					sx={inputStyles}
				/>
			</Stack>
		</form>
	);
};
