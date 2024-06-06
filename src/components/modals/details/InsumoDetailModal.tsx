import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Stack } from "@mui/material";
import { BackButton } from "../../buttons/BackButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ArticuloInsumo } from "../../../types/Insumo";
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

interface InsumoDetailModalProps {
	insumo: ArticuloInsumo;
	width?: number;
	height?: number;
	open: boolean;
	handleClose: () => void;
}

export function InsumoDetailModal({
	insumo,
	width,
	height,
	open,
	handleClose,
}: InsumoDetailModalProps) {
	const CONSTANTS = getConstants();

	const [categoria, setCategoria] = useState<Categoria>();

	useEffect(() => {
		const getCategoria = async () => {
			try {
				const response = await getData<Categoria>(
					`${CONSTANTS.categorias.getByIdUrl!}${insumo.categoriaId}`
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
						<Typography variant="h5">{insumo.denominacion}</Typography>
					</Stack>
					<InfoOutlinedIcon fontSize="large" sx={{ color: "grey" }} />
				</Stack>
				<Divider />
				<Stack spacing={3} mt={3}>
					<Stack direction="row" spacing={3}>
						<CustomImageCarousel
							images={insumo.imagenes || []}
							alt={insumo.denominacion}
						/>
						<Divider
							orientation="vertical"
							flexItem
							sx={{
								width: "1px",
							}}
						/>
						<Stack spacing={2} width="70%" justifyContent='space-around'>
							{!insumo.esParaElaborar && (
								<Stack
									direction="row"
									spacing={2}
									alignItems="center"
									padding="3% 5%"
									sx={{ border: "2px solid #D3D3D3", borderRadius: 3 }}
								>
									<Typography variant="body1">Precio de Venta</Typography>
									<Typography variant="body1">${insumo.precioVenta}</Typography>
								</Stack>
							)}

							<Stack
								direction="row"
								spacing={2}
								marginRight="5%"
								alignItems="center"
							>
								<Typography variant="subtitle1" fontWeight="bold">
									Para Elaborar:
								</Typography>
								<Typography variant="body1">
									{insumo.esParaElaborar ? "Sí" : "No"}
								</Typography>
							</Stack>

							{insumo.unidadMedida && (
								<Stack direction="row" spacing={2}>
									<Typography variant="subtitle1" fontWeight="bold">
										Unidad de Medida:
									</Typography>
									<Typography variant="body1">
										{insumo.unidadMedida?.denominacion}
									</Typography>
								</Stack>
							)}

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
									Precio de Compra:
								</Typography>
								<Typography variant="body1">${insumo.precioCompra}</Typography>
							</Stack>
							<Stack direction="row" spacing={2} justifyContent="space-between">
								<Stack direction="row" spacing={2}>
									<Typography variant="subtitle1" fontWeight="bold">
										Stock Actual:
									</Typography>
									<Typography variant="body1">{insumo.stockActual}</Typography>
								</Stack>
								<Stack direction="row" spacing={2}>
									<Typography variant="subtitle1" fontWeight="bold">
										Stock Máximo:
									</Typography>
									<Typography variant="body1">{insumo.stockMaximo}</Typography>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
}
