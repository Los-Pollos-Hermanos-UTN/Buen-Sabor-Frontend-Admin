import { Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
	photos: Yup.mixed().required("Required"),
});

const initialValues = {
	photos: [],
};

export const ProductFormStep4 = () => {
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
				<TextField
					fullWidth
					id="photo"
					name="photo"
					label="Foto (URL)"
					value={formik.values.photos}
					onChange={formik.handleChange}
					error={formik.touched.photos && Boolean(formik.errors.photos)}
					helperText={formik.touched.photos && formik.errors.photos}
				/>
			</Stack>
		</form>
	);
};
