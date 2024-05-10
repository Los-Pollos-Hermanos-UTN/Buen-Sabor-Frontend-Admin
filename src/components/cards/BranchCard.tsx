import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Rating, Stack } from "@mui/material";
import { QuickAccessWhiteButton } from "../buttons/QuickAccessWhiteButton";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";
import { Action } from "../../types/enums/Enums";

export function BranchCard() {
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
							Sucursal
						</Typography>
						<Stack height="100%" justifyContent="space-between">
							<Stack>
								<QuickAccessWhiteButton
									action={Action.CREATE} // Modificar
									icon={<EditIcon sx={{ color: "#fff" }} />}
									text={"Editar"}
								/>
								<QuickAccessWhiteButton
									action={Action.CREATE} // Modificar
									icon={<RoomIcon sx={{ color: "#fff" }} />}
									text={"Ubicación"}
								/>
							</Stack>
							<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
						</Stack>
					</Stack>
				</CardContent>

				<CardMedia
					component="img"
					height="350"
					image="https://hips.hearstapps.com/hmg-prod/images/bosco-verticale-designed-by-stefano-boeri-2014-royalty-free-image-1676998427.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*"
					alt="Mansa Sucursal"
				/>
			</Stack>
		</Card>
	);
}
