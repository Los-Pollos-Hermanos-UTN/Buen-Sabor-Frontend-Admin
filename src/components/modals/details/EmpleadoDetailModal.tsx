import { Modal, Typography, Stack, Divider, Button, Chip } from "@mui/material";
import { Empleado } from "../../../types/Empleado";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	borderRadius: "20px",
	boxShadow: 24,
	p: 5,
};

interface EmpleadoDetailModalProps {
	empleado: Empleado;
	open: boolean;
	width?: number;
	height?: number;
	handleClose: () => void;
}

export const EmpleadoDetailModal = ({
	empleado,
	open,
	width,
	height,
	handleClose,
}: EmpleadoDetailModalProps) => {
	return (
		<Modal open={open} onClose={handleClose}>
			<Stack
				sx={{
					...style,
					width: width ? width : "800",
					height: height ? height : "auto",
					maxWidth: 800,
					maxHeight: 800,
				}}
			>
				<Typography variant="h5">{`Empleado: ${empleado.nombre} ${empleado.apellido}`}</Typography>
				<Divider sx={{ my: 1.5 }} />
				<Stack spacing={2}>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Stack direction="row" spacing={1}>
							<Typography>{`Tipo de Empleado: `}</Typography>
							<Typography
								color="#49111C"
								fontWeight="bold"
							>{`${empleado.tipoEmpleado}`}</Typography>
						</Stack>
					</Stack>
				</Stack>
				<Divider sx={{ my: 1.5 }} />
				<Stack height="100%" justifyContent="space-between" spacing={3}>
					<Stack spacing={2} direction="row">
						<Stack spacing={2} width="50%">
							<Typography variant="h6">Información Personal</Typography>
							<Typography>{`Teléfono: ${empleado.telefono}`}</Typography>
							<Typography>{`Email: ${empleado.email}`}</Typography>
							<Typography>{`Fecha de Nacimiento: ${empleado.fechaNacimiento}`}</Typography>
						</Stack>
						<Divider orientation="vertical" />
						<Stack spacing={2} width="50%">
							<Typography variant="h6">Información de Usuario</Typography>
							<Typography>{`Auth0 ID: ${empleado.usuarioEmpleado.auth0Id}`}</Typography>
							<Typography>{`Nombre de Usuario: ${empleado.usuarioEmpleado.userName}`}</Typography>
						</Stack>
					</Stack>
					<Stack direction="row" width="100%" justifyContent="space-between">
						<Typography variant="h6">{`Sucursal: ${empleado.sucursal?.nombre}`}</Typography>
						<Button
							onClick={handleClose}
							variant="contained"
							sx={{
								width: "20%",
								textTransform: "none",
								backgroundColor: "#49111C",
								"&:hover": {
									backgroundColor: "#49111C",
								},
							}}
						>
							Cerrar
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Modal>
	);
};
