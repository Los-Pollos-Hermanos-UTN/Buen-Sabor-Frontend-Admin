import {
	Modal,
	Box,
	Typography,
	Stack,
	Divider,
	Button,
	Select,
	MenuItem,
	SelectChangeEvent,
	Chip,
} from "@mui/material";
import { Pedido } from "../../../types/Pedido";
import { Estado, ArrayEstados } from "../../../types/enums/Enums";

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

interface PedidoDetailModalProps {
	pedido: Pedido;
	open: boolean;
	width?: number;
	height?: number;
	handleClose: () => void;
	onMove: (pedido: Pedido, estado: Estado) => void;
}

export const PedidoDetailModal = ({
	pedido,
	open,
	width,
	height,
	handleClose,
	onMove,
}: PedidoDetailModalProps) => {
	const handleEstadoChange = (event: SelectChangeEvent) => {
		onMove(pedido, event.target.value as unknown as Estado);
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Stack
				sx={{
					...style,
					width: width ? width : 800,
					height: height ? height : "auto",
					maxWidth: 800,
					maxHeight: 800,
				}}
			>
				<Typography variant="h6">{`Pedido #${pedido.id}`}</Typography>
				<Divider sx={{ my: 1.5 }} />
				<Stack spacing={2}>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Stack direction="row" spacing={1}>
							<Typography>{`Estado Actual: `}</Typography>
							<Typography
								color="#49111C"
								fontWeight="bold"
							>{`${pedido.estado}`}</Typography>
						</Stack>

						<Stack width="30%">
							<Typography>{`Mover a`}</Typography>
							<Select
								defaultValue={pedido.estado.toString()}
								onChange={handleEstadoChange}
								sx={{
									height: "35px",
								}}
							>
								{ArrayEstados.map((key) => (
									<MenuItem key={key} value={key}>
										{key}
									</MenuItem>
								))}
							</Select>
						</Stack>
					</Stack>
				</Stack>
				<Divider sx={{ my: 1.5 }} />
				<Stack height="100%" justifyContent="space-between">
					<Stack spacing={2} direction="row">
						<Stack spacing={2} width="50%">
							<Typography variant="h6">Información</Typography>

							<Typography>{`Tipo de Envio: ${pedido.tipoEnvio}`}</Typography>
							<Typography>{`Forma de Pago: ${pedido.formaPago}`}</Typography>

							<Typography>{`Hora Estimada de Finalización: ${pedido.horaEstimadaFinalizacion.substring(
								0,
								5
							)}`}</Typography>
						</Stack>
						<Divider orientation="vertical" />
						<Stack spacing={2} width="50%">
							<Typography variant="h6">Cliente</Typography>
							<Typography>{`Cliente: ${pedido.cliente.nombre} ${pedido.cliente.apellido}`}</Typography>
							<Typography>{`Teléfono: ${pedido.cliente.telefono}`}</Typography>
							<Typography>{`Domicilio: ${pedido.domicilio?.calle} ${pedido.domicilio?.numero}, ${pedido.domicilio?.localidad.nombre}`}</Typography>
						</Stack>
					</Stack>
					<Stack spacing={2} direction="row">
						<Typography variant="subtitle1" fontWeight="bold">
							Articulos:
						</Typography>
						<Stack spacing={1} direction='row'>
							{pedido.detallePedidos.map((detalle, index) => (
								<Chip
									key={index}
									label={`${detalle.cantidad}x ${detalle.articulo.denominacion}`}
								/>
							))}
						</Stack>
					</Stack>
					<Stack direction="row" width="100%" justifyContent="space-between">
						<Typography variant="h6">{`Total: $${pedido.total}`}</Typography>
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
