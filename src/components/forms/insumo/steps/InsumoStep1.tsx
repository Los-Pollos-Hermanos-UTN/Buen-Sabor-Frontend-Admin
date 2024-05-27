import {
	Autocomplete,
	Divider,
	FormControlLabel,
	Stack,
	Switch,
	TextField,
	alpha,
	createFilterOptions,
	styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../../../../services/RequestExecutor";
import { Categoria } from "../../../../types/Categoria";
import { getConstants } from "../../../../constants/constants";
import { flattenCategorias } from "../../../../utils/CategoriaUtils";

const CustomSwitch = styled(Switch)(({ theme }) => ({
	"& .MuiSwitch-switchBase.Mui-checked": {
		color: "#49111C",
		"&:hover": {
			backgroundColor: alpha("#49111C", theme.palette.action.hoverOpacity),
		},
	},
	"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
		backgroundColor: "#49111C",
	},
}));

export const InsumoStep1 = (props: any) => {
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

	const handleCategoriaChange = (_: any, value: Categoria | null) => {
		setFieldValue("categoriaId", value ? value.id : "");
	};

	return (
		<Stack spacing={2}>
			<FormControlLabel
				control={
					<CustomSwitch
						onChange={handleChange}
						name="esParaElaborar"
						checked={values.esParaElaborar}
						sx={{
							color: "#49111C",
						}}
					/>
				}
				label="Es Para Elaborar?"
				name="esParaElaborar"
			/>
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
				autoComplete="off"
			/>
			{values.esParaElaborar ? (
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
					autoComplete="off"
				/>
			) : (
				<Stack direction="row" spacing={3} justifyContent="space-between">
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
						autoComplete="off"
					/>
					<Divider orientation="vertical" />
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
						autoComplete="off"
					/>
				</Stack>
			)}
			<Autocomplete
				fullWidth
				filterOptions={createFilterOptions({ limit: 4 })}
				options={categorias}
				getOptionLabel={(option) => option.denominacion}
				value={categorias.find((cat) => cat.id === values.categoriaId) || null}
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
	);
};
