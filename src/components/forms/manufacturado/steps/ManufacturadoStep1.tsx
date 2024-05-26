import {
	Autocomplete,
	Stack,
	TextField,
	createFilterOptions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getConstants } from "../../../../constants/constants";
import { getData } from "../../../../services/RequestExecutor";
import { Categoria } from "../../../../types/Categoria";
import { flattenCategorias } from "../../../../utils/CategoriaUtils";

export const ManufacturadoStep1 = (props: any) => {
	const CONSTANTS = getConstants();
	const { values, errors, handleChange, handleBlur, setFieldValue } = props;
	const [categorias, setCategorias] = useState<Categoria[]>([]);

	useEffect(() => {
		const fetchCategorias = async () => {
			try {
				const categoriasData = await getData<Categoria[]>(
					CONSTANTS.categorias.getUrl
				);
				const flatCategorias = flattenCategorias(categoriasData);
				setCategorias(flatCategorias);
			} catch (error) {
				console.error(error);
			}
		};
		fetchCategorias();
	}, []);

	const handleCategoriaChange = (event: any, value: Categoria | null) => {
		setFieldValue("categoriaId", value ? value.id : "");
	};

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
				autoComplete={"off"}
			/>
			<TextField
				fullWidth
				multiline
				rows={4}
				id="descripcion"
				name="descripcion"
				label="Descripción"
				value={values.descripcion}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.descripcion)}
				helperText={errors.descripcion}
				variant="outlined"
				autoComplete={"off"}
			/>
			<Stack direction="row" spacing={3} justifyContent="space-between">
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
					autoComplete={"off"}
				/>
				<Autocomplete
					fullWidth
					filterOptions={createFilterOptions({ limit: 4 })}
					options={categorias}
					getOptionLabel={(option) => option.denominacion}
					value={
						categorias.find((cat) => cat.id === values.categoriaId) || null
					}
					onChange={handleCategoriaChange}
					onBlur={handleBlur}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Categoría"
							error={Boolean(errors.categoriaId)}
							helperText={errors.categoriaId}
						/>
					)}
				/>
			</Stack>
		</Stack>
	);
};
