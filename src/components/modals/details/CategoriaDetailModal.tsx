import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
	Chip,
	Divider,
	List,
	ListItem,
	ListItemText,
	Stack,
} from "@mui/material";

import { Categoria } from "../../../types/Categoria";
import { BackButton } from "../../buttons/BackButton";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";

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

interface CategoriaDetailModalProps {
	categoria: Categoria;
	width?: number;
	height?: number;
	open: boolean;
	handleClose: () => void;
}

export function CategoriaDetailModal({
	categoria,
	width,
	height,
	open,
	handleClose,
}: CategoriaDetailModalProps) {
	return (
		<div>
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
						height="15%"
						justifyContent="space-between"
						alignItems="center"
						mb={height === 300 ? "5%" : "3%"}
					>
						<Stack direction="row" spacing={2} alignItems="center">
							<BackButton onClick={handleClose} />
							<Typography variant="h5">{categoria.denominacion}</Typography>
						</Stack>
						<InfoOutlinedIcon fontSize="large" sx={{ color: "grey" }} />
					</Stack>
					<Divider />
					<Stack direction="row">
						<Stack direction="column" width="100%" height="auto" mt="4%">
							{categoria.sucursales && categoria.sucursales.length > 0 ? (
								<>
									<Typography variant="h6">Aplica a:</Typography>
									<List>
										{categoria.sucursales.map((sucursal) => (
											<ListItem sx={{ width: "300px" }}>
												<Stack direction="row" alignItems="center" spacing={1}>
													<HorizontalRuleOutlinedIcon />
													<ListItemText primary={sucursal.nombre} />
												</Stack>
											</ListItem>
										))}
									</List>
								</>
							) : (
								<></>
							)}
						</Stack>
						<Divider
							orientation="vertical"
							sx={{ width: "30px", color: "red" }}
						/>
						<Stack
							direction="column"
							width="100%"
							height="85%"
							mt="4%"
							spacing={2}
						>
							{categoria.subCategorias && categoria.subCategorias.length > 0 ? (
								<>
									<Typography variant="h6">Subcategorías</Typography>
									{categoria.subCategorias.map((subCategoria) => (
										<Chip
											sx={{ width: "300px" }}
											label={subCategoria.denominacion}
										/>
									))}
								</>
							) : (
								<></>
							)}
						</Stack>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
}
