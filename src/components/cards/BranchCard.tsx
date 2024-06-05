import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Rating, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Sucursal } from "../../types/Sucursal";

interface BranchCardProps {
	sucursal: Sucursal;
	handleEdit: (sucursal: Sucursal) => void;
	handleShowInfo: (sucursal: Sucursal) => void;
}

export function BranchCard({
	sucursal,
	handleEdit,
	handleShowInfo,
}: BranchCardProps) {
	return (
		<Card
			sx={{
				maxWidth: 450,
				backgroundColor: "rgba(0,0,0, 0.3)",
				borderRadius: "8px",
			}}
		>
			<Stack direction="row">
				<CardContent>
					<Stack height="100%">
						<Typography gutterBottom variant="h5" component="div" color="white">
							{sucursal.nombre}
						</Typography>
						<Stack height="100%" justifyContent="space-between">
							<Stack>
								<Button
									sx={{
										color: "white",
										textTransform: "capitalize",
										width: "100%",
										justifyContent: "flex-start",
									}}
									startIcon={<EditIcon />}
									onClick={() => handleEdit(sucursal)}
								>
									<Typography>Editar</Typography>
								</Button>
								<Button
									sx={{
										color: "white",
										textTransform: "capitalize",
										width: "100%",
										justifyContent: "flex-start",
									}}
									startIcon={<InfoIcon />}
									onClick={() => handleShowInfo(sucursal)}
								>
									<Typography>Información</Typography>
								</Button>
							</Stack>
							<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
						</Stack>
					</Stack>
				</CardContent>

				<iframe
					src={`https://www.google.com/maps?q=${encodeURIComponent(
						`${sucursal.domicilio.calle} ${sucursal.domicilio.numero}, ${sucursal.domicilio.cp}, ${sucursal.domicilio.localidad.nombre}, ${sucursal.domicilio.localidad.provincia.nombre}, ${sucursal.domicilio.localidad.provincia.pais.nombre}`
					)}&output=embed`}
					width="450"
					height="320"
					style={{ border: 0 }}
					loading="lazy"
					allowFullScreen
				></iframe>
			</Stack>
		</Card>
	);
}
