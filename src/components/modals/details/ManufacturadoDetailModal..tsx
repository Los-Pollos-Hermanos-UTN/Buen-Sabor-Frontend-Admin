import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chip, Divider, Stack } from "@mui/material";
import { BackButton } from "../../buttons/BackButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ArticuloManufacturado } from "../../../types/Manufacturado";
import { CustomImageCarousel } from "../../shared/ImageGallery";
import { useEffect, useState } from "react";
import { Categoria } from "../../../types/Categoria";
import { getData } from "../../../services/RequestExecutor";
import { getConstants } from "../../../constants/constants";

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

interface ManufacturadoDetailModalProps {
	manufacturado: ArticuloManufacturado;
	width?: number;
	height?: number;
	open: boolean;
	handleClose: () => void;
}

export function ManufacturadoDetailModal({
	manufacturado,
	width,
	height,
	open,
	handleClose,
}: ManufacturadoDetailModalProps) {
	const CONSTANTS = getConstants();

	const [categoria, setCategoria] = useState<Categoria>();

	useEffect(() => {
		const getCategoria = async () => {
			try {
				const response = await getData<Categoria>(
					`${CONSTANTS.categorias.getByIdUrl!}${manufacturado.categoriaId}`
				);
				setCategoria(response);
			} catch (error) {
				console.error(error);
			}
		};
		getCategoria();
	}, [open]);

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
						<Typography variant="h5">{manufacturado.denominacion}</Typography>
					</Stack>
					<InfoOutlinedIcon fontSize="large" sx={{ color: "grey" }} />
				</Stack>
				<Divider />
				<Stack spacing={3} mt={3}>
					<Stack direction="row" spacing={3}>
						<CustomImageCarousel
							images={manufacturado.imagenes || []}
							alt={manufacturado.denominacion}
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
								<Typography variant="body1">Precio de Venta</Typography>
								<Typography variant="body1">
									${manufacturado.precioVenta}
								</Typography>
							</Stack>

							<Stack direction="row" spacing={2}>
								<Typography variant="subtitle1" fontWeight="bold">
									Categoría:
								</Typography>
								<Typography variant="body1">
									{categoria?.denominacion}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2}>
								<Typography variant="subtitle1" fontWeight="bold">
									Descripción:
								</Typography>
								<Typography variant="body1">
									{manufacturado.descripcion}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2}>
								<Typography variant="subtitle1" fontWeight="bold">
									Tiempo de Preparación:
								</Typography>
								<Typography variant="body1">
									{manufacturado.tiempoEstimadoMinutos} minutos
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2}>
								<Typography variant="subtitle1" fontWeight="bold">
									Preparación:
								</Typography>
								<Typography variant="body1">
									{manufacturado.preparacion}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={2}>
								<Typography variant="subtitle1" fontWeight="bold">
									Insumos:
								</Typography>
								<Stack spacing={1}>
									{manufacturado.articuloManufacturadoDetalles.map(
										(detalle, index) => (
											<Chip
												key={index}
												label={`${detalle.cantidad}x ${detalle.articuloInsumo.denominacion}`}
											/>
										)
									)}
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
}
