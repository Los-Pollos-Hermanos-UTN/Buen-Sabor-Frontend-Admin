import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Stack, Chip } from "@mui/material";
import { BackButton } from "../../buttons/BackButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Sucursal } from "../../../types/Sucursal";

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

interface SucursalDetailModalProps {
	sucursal: Sucursal;
	width?: number;
	height?: number;
	open: boolean;
	handleClose: () => void;
}

export function SucursalDetailModal({
	sucursal,
	width,
	height,
	open,
	handleClose,
}: SucursalDetailModalProps) {
	return (
		<Modal open={open} onClose={handleClose}>
			<Box
				sx={{
					...style,
					width: width ? width : 800,
					height: height ? height : "auto",
					maxWidth: 800,
					maxHeight: 800,
				}}
			>
				<Stack
					direction="row"
					width="100%"
					height="10%"
					justifyContent="space-between"
					alignItems="center"
					marginBottom="2%"
				>
					<Stack direction="row" spacing={2} alignItems="center">
						<BackButton onClick={handleClose} />
						<Typography variant="h5">{sucursal.nombre}</Typography>
					</Stack>
					<InfoOutlinedIcon fontSize="large" sx={{ color: "grey" }} />
				</Stack>
				<Divider />
				<Stack spacing={3} mt={3}>
					<Stack direction="row" justifyContent="space-between">
						<Stack
							direction="row"
							spacing={2}
							alignItems="center"
							padding="2%"
							sx={{ border: "2px solid #D3D3D3", borderRadius: 3 }}
						>
							<Typography variant="h6">Horario</Typography>
							<Typography variant="body1">
								{sucursal.horarioApertura.toString().substring(0, 5)} -{" "}
								{sucursal.horarioCierre.toString().substring(0, 5)}
							</Typography>
						</Stack>

						<Stack
							direction="row"
							spacing={2}
							marginRight="5%"
							alignItems="center"
						>
							<Typography variant="subtitle1" fontWeight="bold">
								Casa Matriz:
							</Typography>
							<Typography variant="body1">
								{sucursal.casaMatriz ? "Sí" : "No"}
							</Typography>
						</Stack>
					</Stack>

					<Stack direction="row" spacing={2}>
						<Typography variant="subtitle1" fontWeight="bold">
							Domicilio:
						</Typography>
						<Typography variant="body1">{`${sucursal.domicilio.calle} ${sucursal.domicilio.numero}, ${sucursal.domicilio.cp}, ${sucursal.domicilio.localidad.nombre}, ${sucursal.domicilio.localidad.provincia.nombre}, ${sucursal.domicilio.localidad.provincia.pais.nombre}`}</Typography>
					</Stack>
					<Stack direction="row" spacing={2}>
						<Typography variant="subtitle1" fontWeight="bold">
							Promociones:
						</Typography>
						<Stack direction="row" spacing={1} flexWrap="wrap">
							{sucursal.promociones.map((promo, index) => (
								<Chip key={index} label={promo.denominacion} />
							))}
						</Stack>
					</Stack>
					<Stack direction="row" spacing={2}>
						<Typography variant="subtitle1" fontWeight="bold">
							Categorías:
						</Typography>
						<Stack direction="row" spacing={1} flexWrap="wrap">
							{sucursal.categorias.map((cat, index) => (
								<Chip key={index} label={cat.denominacion} />
							))}
						</Stack>
					</Stack>
					<Stack direction="row" spacing={2}>
						<Typography variant="subtitle1" fontWeight="bold">
							Empleados:
						</Typography>
						<Stack direction="row" spacing={1} flexWrap="wrap">
							{sucursal.empleados.map((emp, index) => (
								<Chip key={index} label={emp.nombre} />
							))}
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
}
