import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chip, Divider, Stack } from "@mui/material";
import { BackButton } from "../../buttons/BackButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Promocion } from "../../../types/Promocion";
import { CustomImageCarousel } from "../../shared/ImageGallery";

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

interface PromocionDetailModalProps {
	promocion: Promocion;
	width?: number;
	height?: number;
	open: boolean;
	handleClose: () => void;
}

export function PromocionDetailModal({
	promocion,
	width,
	height,
	open,
	handleClose,
}: PromocionDetailModalProps) {
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
						<Typography variant="h5">{promocion.denominacion}</Typography>
					</Stack>
					<InfoOutlinedIcon fontSize="large" sx={{ color: "grey" }} />
				</Stack>
				<Divider />
				<Stack spacing={3} mt={3}>
					<Stack direction="row" spacing={3}>
						<CustomImageCarousel
							images={promocion.imagenes || []}
							alt={promocion.denominacion}
						/>
						<Divider
							orientation="vertical"
							flexItem
							sx={{
								width: "1px",
							}}
						/>
						<Stack spacing={2} width="70%" justifyContent="space-around">
							<Stack
								direction="row"
								spacing={2}
								alignItems="center"
								padding="3% 5%"
								sx={{ border: "2px solid #D3D3D3", borderRadius: 3 }}
							>
								<Typography variant="body1">Precio Promocional</Typography>
								<Typography variant="body1">
									${promocion.precioPromocional}
								</Typography>
							</Stack>

							<Stack direction="row" spacing={5}>
								<Stack direction="row" spacing={2}>
									<Typography variant="subtitle1" fontWeight="bold">
										Desde:
									</Typography>
									<Typography variant="body1">
										{promocion.fechaDesde.toString()}
									</Typography>
								</Stack>
								<Stack direction="row" spacing={2}>
									<Typography variant="subtitle1" fontWeight="bold">
										Hasta:
									</Typography>
									<Typography variant="body1">
										{promocion.fechaHasta.toString()}
									</Typography>
								</Stack>
							</Stack>

							<Stack direction="row" spacing={5}>
								<Stack direction="row" spacing={2}>
									<Typography variant="subtitle1" fontWeight="bold">
										Desde las:
									</Typography>
									<Typography variant="body1">
										{promocion.horaDesde.toString().substring(0, 5)}
									</Typography>
								</Stack>
								<Stack direction="row" spacing={2}>
									<Typography variant="subtitle1" fontWeight="bold">
										Hasta las:
									</Typography>
									<Typography variant="body1">
										{promocion.horaHasta.toString().substring(0, 5)}
									</Typography>
								</Stack>
							</Stack>

							<Stack direction="row" spacing={2}>
								<Typography variant="subtitle1" fontWeight="bold">
									Descripción del Descuento:
								</Typography>
								<Typography variant="body1">
									{promocion.descripcionDescuento}
								</Typography>
							</Stack>

							<Stack direction="row" spacing={2}>
								<Typography variant="subtitle1" fontWeight="bold">
									Tipo de Promoción:
								</Typography>
								<Typography variant="body1">
									{promocion.tipoPromocion}
								</Typography>
							</Stack>

							<Stack direction='row' spacing={2}>
								<Typography variant="subtitle1" fontWeight="bold">
									Sucursales:
								</Typography>
								<Stack direction="row" spacing={1}>
									{promocion.sucursales.map((sucursal, index) => (
										<Chip key={index} label={sucursal.nombre} />
									))}
								</Stack>
							</Stack>

							<Stack spacing={2}>
								<Typography variant="subtitle1" fontWeight="bold">
									Detalles de la Promoción:
								</Typography>
								<Stack direction="row" spacing={1}>
									{promocion.promocionDetalles.map((detalle, index) => (
										<Chip
											key={index}
											label={`${detalle.cantidad}x ${detalle.articulo.denominacion}`}
										/>
									))}
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
}
