import { Card, Stack, CardContent, Typography, Button } from "@mui/material";
import { Empresa } from "../../types/Empresa";

interface SelectorEmpresaProps {
	empresa: Empresa;
	onInit: () => void;
}

export function SelectorEmpresa({ empresa, onInit }: SelectorEmpresaProps) {
	return (
		<Card
			sx={{
				width: 350,
				height: 400,
				maxWidth: 450,
				backgroundColor: "transparent",
				borderRadius: "20px",
				border: "3px solid #49111C",
			}}
		>
			<Stack
				height="85%"
				direction="column"
				alignItems="center"
				justifyContent="space-between"
			>
				<img
					src="https://avatars.githubusercontent.com/u/163006705?s=200&v=4"
					alt="Manso Logo"
					style={{
						marginTop: "15%",
						width: "50%",
						height: "50%",
						borderRadius: "50%",
					}}
				/>
				<Stack direction="row" justifyContent="center" mt="5%">
					<CardContent>
						<Stack height="100%">
							<Typography
								textTransform="none"
								variant="h5"
								fontWeight="bold"
								component="div"
								color="#49111C"
							>
								{empresa.nombre}
							</Typography>
						</Stack>
					</CardContent>
				</Stack>
				<Button
					variant="contained"
					sx={{
						backgroundColor: "#49111C",
						"&:hover": {
							backgroundColor: "#49111C",
						},
						textTransform: "none",
						color: "white",
					}}
					onClick={onInit}
				>
					Ingresar
				</Button>
			</Stack>
		</Card>
	);
}
