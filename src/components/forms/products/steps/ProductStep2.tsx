import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Stack,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FixedTags from "../../../selects/IngredientsSelect";

const validationSchema = Yup.object({
	weight: Yup.number().required("Required"),
	calories: Yup.number().required("Required"),
	ingredients: Yup.array().required("Required"),
	stock: Yup.number().required("Required"),
});

const initialValues = {
	weight: "",
	calories: "",
	ingredients: [],
	stock: "",
};

export const ProductFormStep2 = () => {
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
					id="weight"
					name="weight"
					label="Peso"
					value={formik.values.weight}
					onChange={formik.handleChange}
					error={formik.touched.weight && Boolean(formik.errors.weight)}
					helperText={formik.touched.weight && formik.errors.weight}
				/>
				<TextField
					fullWidth
					id="calories"
					name="calories"
					label="Calorias"
					value={formik.values.calories}
					onChange={formik.handleChange}
					error={formik.touched.calories && Boolean(formik.errors.calories)}
					helperText={formik.touched.calories && formik.errors.calories}
				/>
				<FormControl fullWidth>
					<FixedTags
						id="ingredients"
						value={formik.values.ingredients.map(ingredient => ({ title: ingredient }))}
						onChange={(event, newValue) => {
							formik.setFieldValue(
								'ingredients',
								newValue.map((item: any) => item.title)
							);
						}}
					/>
				</FormControl>
				<TextField
					fullWidth
					id="stock"
					name="stock"
					label="Stock"
					value={formik.values.stock}
					onChange={formik.handleChange}
					error={formik.touched.stock && Boolean(formik.errors.stock)}
					helperText={formik.touched.stock && formik.errors.stock}
				/>
			</Stack>
		</form>
	);
};
