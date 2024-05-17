import { Stack, TextField } from "@mui/material";

export const ManufacturadoStep1 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="denominacion"
				name="denominacion"
				label="Denominación del Producto"
				value={values.denominacion}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.denominacion)}
				helperText={errors.denominacion}
				variant="outlined"
			/>
			<TextField
				fullWidth
				id="descripcion"
				name="descripcion"
				label="Descripción"
				value={values.descripcion}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.descripcion)}
				helperText={errors.descripcion}
				variant="outlined"
			/>
			<TextField
				fullWidth
				id="preparacion"
				name="preparacion"
				label="Preparacion"
				value={values.preparacion}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.preparacion)}
				helperText={errors.preparacion}
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
		</Stack>
	);
};
