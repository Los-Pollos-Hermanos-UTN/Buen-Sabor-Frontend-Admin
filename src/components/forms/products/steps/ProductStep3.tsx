import { FormControl, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FixedTags from "../../../selects/IngredientsSelect";

const validationSchema = Yup.object({
	ingredients: Yup.array().required("Required"),
});

const initialValues = {
	ingredients: [],
};

export const ProductFormStep3 = () => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Stack>
				<FormControl fullWidth>
					<FixedTags
						id="ingredients"
						value={formik.values.ingredients.map((ingredient) => ({
							title: ingredient,
						}))}
						onChange={(event, newValue) => {
							formik.setFieldValue(
								"ingredients",
								newValue.map((item: any) => item.title)
							);
						}}
					/>
				</FormControl>
			</Stack>
		</form>
	);
};
