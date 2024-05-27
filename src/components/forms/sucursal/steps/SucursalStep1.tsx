import {
	Checkbox,
	Divider,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { formatHora } from "../../../../utils/DateTimeUtils";

export const SucursalStep1 = (props: any) => {
	const { values, errors, handleChange, handleBlur, setFieldValue } = props;

	const handleHoraChange = (field: string, time: Dayjs | null) => {
		const formattedTime = formatHora(time);
		setFieldValue(field, formattedTime);
	};

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				id="nombre"
				name="nombre"
				label="Nombre de la Sucursal"
				value={values.nombre}
				onChange={handleChange}
				onBlur={handleBlur}
				error={Boolean(errors.nombre)}
				helperText={errors.nombre}
				variant="outlined"
			/>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<TimePicker
					label="Horario de Apertura"
					value={
						values.horarioApertura
							? dayjs(values.horarioApertura, "HH:mm:ss")
							: null
					}
					onChange={(time) => handleHoraChange("horarioApertura", time)}
				/>
				<Divider orientation="vertical" />
				<TimePicker
					label="Horario de Cierre"
					value={
						values.horarioCierre
							? dayjs(values.horarioCierre, "HH:mm:ss")
							: null
					}
					onChange={(time) => handleHoraChange("horarioCierre", time)}
				/>
			</Stack>
			<FormControlLabel
				control={
					<Checkbox
						onChange={handleChange}
						name="casaMatriz"
						color="primary"
						checked={values.casaMatriz}
					/>
				}
				label="Es Casa Matriz?"
				name="casaMatriz"
			/>
		</Stack>
	);
};
