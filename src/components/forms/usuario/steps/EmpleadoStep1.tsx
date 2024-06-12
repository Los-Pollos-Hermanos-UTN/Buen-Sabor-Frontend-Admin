import { Stack, TextField, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { formatFecha } from "../../../../utils/DateTimeUtils";

export const EmpleadoStep1 = (props: any) => {
	const { values, errors, handleChange, handleBlur, setFieldValue, touched } =
		props;

	const tiposEmpleado = [
		{ id: 1, value: "ADMIN", label: "Administrador" },
		{ id: 2, value: "COCINERO", label: "Cocinero" },
		{ id: 3, value: "CAJERO", label: "Cajero" },
		{ id: 2, value: "DELIVERY", label: "Delivery" },
	];

	const handleTipoEmpleadoChange = (_: any, value: any | null) => {
		setFieldValue("tipoEmpleado", value ? value.value : "");
	};

	const handleFechaChange = (field: string, date: Dayjs | null) => {
		const formattedDate = formatFecha(date);
		setFieldValue(field, formattedDate);
	};

	return (
		<Stack spacing={2}>
			<Stack direction="row" spacing={2}>
				<TextField
					fullWidth
					id="nombre"
					name="nombre"
					label="Nombre"
					value={values.nombre}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.nombre)}
					helperText={errors.nombre}
				/>
				<TextField
					fullWidth
					id="apellido"
					name="apellido"
					label="Apellido"
					value={values.apellido}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.apellido)}
					helperText={errors.apellido}
				/>
			</Stack>
			<Stack direction="row" spacing={2}>
				<TextField
					fullWidth
					id="telefono"
					name="telefono"
					label="Teléfono"
					value={values.telefono}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.telefono)}
					helperText={errors.telefono}
				/>
				<TextField
					fullWidth
					id="email"
					name="email"
					label="Email"
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.email)}
					helperText={errors.email}
				/>
			</Stack>
			<Stack direction="row" spacing={2}>
				<DatePicker
					label="Fecha de Nacimiento"
					value={values.fechaNacimiento ? dayjs(values.fechaNacimiento) : null}
					onChange={(date) => handleFechaChange("fechaNacimiento", date)}
				/>
				<Autocomplete
					options={tiposEmpleado}
					getOptionLabel={(option) => option.label}
					value={
						tiposEmpleado.find((tipo) => tipo.value === values.tipoEmpleado) ||
						null
					}
					sx={{
						width: "50%",
					}}
					onChange={handleTipoEmpleadoChange}
					onBlur={handleBlur}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Tipo de Empleado"
							error={touched.tipoEmpleado && Boolean(errors.tipoEmpleado)}
							helperText={touched.tipoEmpleado && errors.tipoEmpleado}
						/>
					)}
				/>
			</Stack>
		</Stack>
	);
};
