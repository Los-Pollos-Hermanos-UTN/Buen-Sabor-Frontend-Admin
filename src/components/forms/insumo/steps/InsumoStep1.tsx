import { Stack, TextField } from "@mui/material";

export const InsumoStep1 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="denominacion"
				name="denominacion"
				label="Denominación del Insumo"
				value={values.denominacion}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.denominacion)}
				helperText={errors.denominacion}
				variant="outlined"
			/>
			<TextField
				fullWidth
				id="precioVenta"
				name="precioVenta"
				label="Precio de Venta"
				type="number"
				value={values.precioVenta}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.precioVenta)}
				helperText={errors.precioVenta}
				variant="outlined"
			/>
			<TextField
				fullWidth
				id="precioCompra"
				name="precioCompra"
				label="Precio de Compra"
				type="number"
				value={values.precioCompra}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.precioCompra)}
				helperText={errors.precioCompra}
				variant="outlined"
			/>
		</Stack>
	);
};
