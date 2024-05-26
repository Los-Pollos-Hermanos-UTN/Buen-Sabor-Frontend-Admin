import { Stack, TextField, Autocomplete } from "@mui/material";

export const PromocionStep1 = (props: any) => {
	const {
		values,
		errors,
		handleChange,
		handleBlur,
		setFieldValue,
		touched,
	} = props;

	const tipoPromocion = [
		{ id: 1, value: "HAPPY_HOUR", denominacion: "Happy Hour" },
		{ id: 2, value: "COMBO", denominacion: "Combo" },
		{ id: 3, value: "PROMOCION", denominacion: "Promoción" },
	];

	const handleTipoPromocionChange = (_: any, value: any | null) => {
		console.log(touched);

		setFieldValue("tipoPromocion", value ? value.value : "");
	};

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="denominacion"
				name="denominacion"
				label="Denominación de la Promoción"
				value={values.denominacion}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.denominacion)}
				helperText={errors.denominacion}
				variant="outlined"
			/>
			<TextField
				multiline
				maxRows={3}
				fullWidth
				id="descripcionDescuento"
				name="descripcionDescuento"
				label="Descripción"
				value={values.descripcionDescuento}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.descripcionDescuento)}
				helperText={errors.descripcionDescuento}
				variant="outlined"
			/>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<TextField
					id="precioPromocional"
					name="precioPromocional"
					label="Precio"
					type="number"
					value={values.precioPromocional}
					onChange={handleChange}
					error={Boolean(errors.precioPromocional)}
					helperText={errors.precioPromocional}
					variant="outlined"
					sx={{
						width: "45%",
					}}
				/>
				<Autocomplete
					sx={{
						width: "55%",
					}}
					options={tipoPromocion}
					getOptionLabel={(option) => option.denominacion}
					value={
						tipoPromocion.find((tipo) => tipo.value === values.tipoPromocion) ||
						null
					}
					onChange={handleTipoPromocionChange}
					onBlur={handleBlur}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Tipo de Promoción"
							error={touched.tipoPromocion && Boolean(errors.tipoPromocion)}
							helperText={touched.tipoPromocion && errors.tipoPromocion}
						/>
					)}
				/>
			</Stack>
		</Stack>
	);
};
