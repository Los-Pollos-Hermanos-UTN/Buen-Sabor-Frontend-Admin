import {
	Stack,
	TextField,
	Divider,
	TextFieldProps,
	Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export const PromocionStep2 = (props: any) => {
	const { values, errors, setFieldValue } = props;

	const formatFecha = (date: Dayjs | null) => {
		return date ? dayjs(date).format("YYYY-MM-DD") : "";
	};

	const formatHora = (time: Dayjs | null) => {
		return time ? dayjs(time).format("HH:mm:ss") : "";
	};

	const handleFechaChange = (field: string, date: Dayjs | null) => {
		const formattedDate = formatFecha(date);
		setFieldValue(field, formattedDate);
	};

	const handleHoraChange = (field: string, time: Dayjs | null) => {
		const formattedTime = formatHora(time);
		setFieldValue(field, formattedTime);
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
					value={values.fechaDesde ? dayjs(values.fechaDesde) : null}
					onChange={(date) => handleFechaChange("fechaDesde", date)}
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
					value={values.fechaHasta ? dayjs(values.fechaHasta) : null}
					onChange={(date) => handleFechaChange("fechaHasta", date)}
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
					value={values.horaDesde ? dayjs(values.horaDesde, "HH:mm:ss") : null}
					onChange={(time) => handleHoraChange("horaDesde", time)}
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
					value={values.horaHasta ? dayjs(values.horaHasta, "HH:mm:ss") : null}
					onChange={(time) => handleHoraChange("horaHasta", time)}
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
