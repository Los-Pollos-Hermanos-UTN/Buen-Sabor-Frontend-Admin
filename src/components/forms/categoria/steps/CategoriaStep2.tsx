import {
	Stack,
	TextField,
	Checkbox,
	Autocomplete,
	Typography,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CategoriaStep2 = (props: any) => {
	const { values, errors, setFieldValue } = props;

	const sucursalesDisponibles = [
		{ id: "1", nombre: "Sucursal 1" },
		{ id: "2", nombre: "Sucursal 2" },
		{ id: "3", nombre: "Sucursal 3" },
		// Agrega más sucursales según sea necesario
	];

	return (
		<Stack spacing={2}>
			<Typography variant="h6">¿A qué Sucursales Aplica?</Typography>
			<Autocomplete
				multiple
				id="sucursales"
				options={sucursalesDisponibles}
				disableCloseOnSelect
				getOptionLabel={(option) => option.nombre}
				onChange={(_, newValue) => {
					setFieldValue(
						"sucursales",
						newValue.filter(
							(value, index, self) =>
								index === self.findIndex((v) => v.id === value.id)
						)
					);
				}}
				isOptionEqualToValue={(option, value) => option.id === value.id}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox
							icon={icon}
							checkedIcon={checkedIcon}
							style={{ marginRight: 8 }}
							checked={selected}
						/>
						{option.nombre}
					</li>
				)}
				value={values.sucursales}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Seleccione las sucursales"
						error={Boolean(errors.sucursales)}
						helperText={errors.sucursales}
					/>
				)}
			/>
		</Stack>
	);
};
