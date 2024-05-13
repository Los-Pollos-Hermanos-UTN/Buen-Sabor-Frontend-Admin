import { Box, Stack, Typography } from "@mui/material";
import { SearchBar } from "../components/shared/SearchBar";
import { useWindowResize } from "../hooks/useWindowResize";
import { EditButton } from "../components/buttons/EditButton";
import { BranchCard } from "../components/cards/BranchCard";
import { useEffect, useState } from "react";
import { ModalSucursal } from "../components/modals/ModalSucursal";

export const Company = () => {
	const { isSmall } = useWindowResize();

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [sucursales, setSucursales] = useState<any[]>([]);

	useEffect(() => {
		fetch("http://localhost:8080/sucursal/")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error en la petición");
				}
				return response.json();
			})
			.then((data) => {
				setSucursales(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	return (
		<>
			<Stack direction="column" m="3%" spacing={3}>
				<SearchBar handleOpen={handleOpen} />
				<Stack direction="row" spacing={3}>
					<Box>
						<Typography variant="h4" fontSize="35px" color="#49111C">
							Pollos Hermanos
						</Typography>
						<Typography variant="h6" fontSize="30px" color="#5E503F">
							Sucursales
						</Typography>
					</Box>
					<EditButton />
				</Stack>
				<Stack direction="row" flexWrap="wrap" justifyContent="center">
					{sucursales.map(() => (
						<Box m="1%">
							<BranchCard />
						</Box>
					))}
				</Stack>
			</Stack>
			<ModalSucursal
				open={open}
				handleClose={handleClose}
				width={0}
				height={600}
				steps={[]}
				substepDefault={true}
			/>
		</>
	);
};
