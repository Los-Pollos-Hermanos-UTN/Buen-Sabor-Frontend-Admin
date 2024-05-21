import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Rating, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";
import { Sucursal } from "../../types/Sucursal";

interface BranchCardProps {
	sucursal: Sucursal;
	handleEdit: (sucursal: Sucursal) => void;
}

export function BranchCard({ sucursal, handleEdit }: BranchCardProps) {
	const handleGoTo = (sucursal: Sucursal) => {
		console.log(sucursal.domicilio);
		console.log(`Esto deberia llevar a maps`);
	};

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
									startIcon={<RoomIcon />}
									onClick={() => handleGoTo(sucursal)}
								>
									<Typography>Ubicación</Typography>
								</Button>
							</Stack>
							<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
						</Stack>
					</Stack>
				</CardContent>

				<CardMedia
					component="img"
					height="320"
					image="https://hips.hearstapps.com/hmg-prod/images/bosco-verticale-designed-by-stefano-boeri-2014-royalty-free-image-1676998427.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*"
					alt="Mansa Sucursal"
				/>
			</Stack>
		</Card>
	);
}
