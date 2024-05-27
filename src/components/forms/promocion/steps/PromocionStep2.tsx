import { Stack, Divider, Typography } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { formatFecha, formatHora } from "../../../../utils/DateTimeUtils";

export const PromocionStep2 = (props: any) => {
	const { values, setFieldValue } = props;

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
				/>
				<Divider orientation="vertical" />
				<DatePicker
					label="Fecha Hasta"
					value={values.fechaHasta ? dayjs(values.fechaHasta) : null}
					onChange={(date) => handleFechaChange("fechaHasta", date)}
				/>
			</Stack>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<TimePicker
					label="Horario Desde"
					value={values.horaDesde ? dayjs(values.horaDesde, "HH:mm:ss") : null}
					onChange={(time) => handleHoraChange("horaDesde", time)}
				/>
				<Divider orientation="vertical" />
				<TimePicker
					label="Horario Hasta"
					value={values.horaHasta ? dayjs(values.horaHasta, "HH:mm:ss") : null}
					onChange={(time) => handleHoraChange("horaHasta", time)}
				/>
			</Stack>
		</Stack>
	);
};
