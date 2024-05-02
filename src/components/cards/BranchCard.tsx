import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions, Rating, Stack } from "@mui/material";
import { QuickAccessWhiteButton } from "../buttons/QuickAccessWhiteButton";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";

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
									icon={<EditIcon sx={{ color: "#fff" }} />}
									text={"Editar"}
								/>
								<QuickAccessWhiteButton
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
					image="https://cdn.discordapp.com/attachments/1020111596321775616/1235405617833967626/arquitetura-minimalista-universidade-monterrey-768x458.png?ex=663440a4&is=6632ef24&hm=31602ce982034fc8b734d3dfd7a94581d902cea106122948bc3917b8dc85733d&"
					alt="Mansa Sucursal"
				/>
			</Stack>
		</Card>
	);
}
