import { Box, Typography, Stack } from "@mui/material";

export interface ProductPreviewCardProps {
	title: string;
	description: string;
	price: number;
	image: string;
}

export const ProductPreviewCard = ({
	title,
	description,
	price,
	image,
}: ProductPreviewCardProps) => {
	return (
		<Box
			sx={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				justifyContent: "start",
				alignItems: "start",
				gap: 2,
				width: "337px",
				height: "280px",
				p: 4,
				backgroundColor: "white",
				borderRadius: "30px",
				boxShadow: 2,
			}}
		>
			<Box
				sx={{
					position: "absolute",
					width: "180px",
					height: "180px",
					right: -100,
					bottom: 50,
					backgroundColor: "grey.200",
					borderRadius: "50%",
					boxShadow: 4,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<img
					src={image}
					alt={title}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover", // Hace que la imagen llene el contenedor manteniendo la proporción
						borderRadius: "50%",
					}}
				/>
			</Box>

			<Stack width="80%" height="100%" justifyContent="space-between">
				<Stack>
					<Typography
						variant="h5"
						sx={{
							fontSize: "1.7rem",
							fontWeight: "bold",
							mb: 2,
							color: "grey.800",
						}}
					>
						{title}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: "grey.700",
						}}
					>
						{description}
					</Typography>
				</Stack>
				<Stack>
					<Typography
						variant="h5"
						sx={{
							fontSize: "1.4rem",
							fontWeight: "bold",
							mb: 2,
							color: "#840707",
						}}
					>
						$ {price}
					</Typography>
				</Stack>
			</Stack>
		</Box>
	);
};
