import {
	Stack,
	TextField,
	Divider,
	TextFieldProps,
	Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

export const PromocionStep2 = (props: any) => {
	const { values, errors, setFieldValue } = props;

	const handleDateTimeChange = (field: string, data: Date | null) => {
		setFieldValue(field, data);
	};

	return (
		<Stack spacing={4}>
			<Typography
				variant="h5"
				sx={{
					textAlign: "center",
				}}
			>
				Fecha & Hora
			</Typography>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<DatePicker
					label="Fecha Desde"
					value={values.fechaDesde}
					onChange={(date) => handleDateTimeChange("fechaDesde", date)}
					renderInput={(params: TextFieldProps) => (
						<TextField
							{...params}
							error={Boolean(errors.fechaDesde)}
							helperText={errors.fechaDesde}
						/>
					)}
				/>
				<Divider orientation="vertical" />
				<DatePicker
					label="Fecha Hasta"
					value={values.fechaHasta}
					onChange={(date) => handleDateTimeChange("fechaHasta", date)}
					renderInput={(params: TextFieldProps) => (
						<TextField
							{...params}
							error={Boolean(errors.fechaHasta)}
							helperText={errors.fechaHasta}
						/>
					)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<TimePicker
					label="Horario Desde"
					value={values.horaDesde}
					onChange={(time) => handleDateTimeChange("horaDesde", time)}
					renderInput={(params: TextFieldProps) => (
						<TextField
							{...params}
							error={Boolean(errors.horaDesde)}
							helperText={errors.horaDesde}
						/>
					)}
				/>
				<Divider orientation="vertical" />
				<TimePicker
					label="Horario Hasta"
					value={values.horaHasta}
					onChange={(time) => handleDateTimeChange("horaHasta", time)}
					renderInput={(params: TextFieldProps) => (
						<TextField
							{...params}
							error={Boolean(errors.horaHasta)}
							helperText={errors.horaHasta}
						/>
					)}
				/>
			</Stack>
		</Stack>
	);
};
