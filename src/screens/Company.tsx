import { Box, Stack, Typography } from "@mui/material";
import { SearchBar } from "../components/shared/SearchBar";
import { EditButton } from "../components/buttons/EditButton";
import { BranchCard } from "../components/cards/BranchCard";
import { useEffect, useState } from "react";
import { Sucursal } from "../types/Sucursal";
import { getData } from "../services/RequestExecutor";
import { CONSTANTS } from "../constants/constants";
import { SucursalFormSteps, SucursalInitialValues, SucursalValidationSchemas } from "../components/forms/sucursal/SucursalFormData";
import { FormModal } from "../components/modals/FormModal";

export const Company = () => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [sucursales, setSucursales] = useState<Sucursal[]>([]);

	useEffect(() => {
		const getSucursales = async () => {
			try {
				const response = await getData<Sucursal[]>(CONSTANTS.sucursal.getUrl);
				setSucursales(response);
			} catch (error) {
				console.error(error);
			}
		};
		getSucursales();
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
			<FormModal
				title={"Agregar Sucursal"}
				open={open}
				handleClose={handleClose}
				width={0}
				height={600}
				initialValues={SucursalInitialValues}
				validationSchemas={SucursalValidationSchemas}
				postUrl={CONSTANTS.sucursal.postURL}
				steps={SucursalFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
