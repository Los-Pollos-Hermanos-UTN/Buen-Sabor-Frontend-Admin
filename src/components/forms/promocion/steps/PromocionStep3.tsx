import {
	Autocomplete,
	Stack,
	TextField,
    Typography,
    Checkbox,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getConstants } from "../../../../constants/constants";
import { getData } from "../../../../services/RequestExecutor";
import { Sucursal } from "../../../../types/Sucursal";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const PromocionStep3 = (props: any) => {
	const CONSTANTS = getConstants();
	const { values, errors, handleChange, handleBlur, setFieldValue } = props;

	const [sucursales, setSucursales] = useState<Sucursal[]>([]);

	useEffect(() => {
		const getSucursales = async () => {
			try {
				const response = await getData<Sucursal[]>(CONSTANTS.sucursal.getUrl);
				setSucursales(response);
			} catch (error) {
				console.error(error);
			}
		};
		getSucursales();
	}, []);

	return (
		<Stack spacing={2}>
			<Typography variant="h6">¿A qué Sucursales Aplica?</Typography>
			<Autocomplete
				multiple
				id="sucursales"
				options={sucursales}
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
