import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { QuickAccessWhiteButton } from "../buttons/QuickAccessWhiteButton";
import { FormModal } from "../modals/FormModal";
import { useState } from "react";
import { Action } from "../../types/enums/Enums";
import {
	SucursalFormSteps,
	SucursalValidationSchemas,
	SucursalInitialValues,
} from "../forms/sucursal/SucursalFormData";
import { CONSTANTS } from "../../constants/constants";
import {
	ArticuloManufacturadoFormSteps,
	ArticuloManufacturadoInitialValues,
	ArticuloManufacturadoValidationSchemas,
} from "../forms/manufacturado/ManufacturadoFormData";

const CustomPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: "rgba(10, 9, 8, 0.5)",
	borderRadius: "10px",
	width: 270,
	height: 150,
	padding: theme.spacing(2),
	...theme.typography.body2,
	textAlign: "center",
}));

interface QuickAccessPaperProps {
	title: string;
	navigateTo?: string;
}

export const QuickAccessPaper = ({
	title,
	navigateTo,
}: QuickAccessPaperProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<CustomPaper square={false}>
				<Stack>
					<Typography
						variant="h6"
						ml="5%"
						mt="3%"
						color="white"
						textAlign="start"
					>
						{title}
					</Typography>
					<Stack flexDirection="column" mt="2%">
						<QuickAccessWhiteButton
							icon={<AddIcon />}
							text="Agregar"
							action={Action.CREATE}
							handleOpen={handleOpen}
						/>
						<QuickAccessWhiteButton
							icon={<ChecklistIcon />}
							text="Listar"
							action={Action.LIST}
							navigateTo={navigateTo}
						/>
					</Stack>
				</Stack>
			</CustomPaper>

			{/* MEJORAR POR FAVOR */}
			<FormModal
				title={
					title === "Articulos"
						? "Agregar Producto Manufacturado"
						: "Agregar Sucursal"
				}
				open={open}
				handleClose={handleClose}
				width={0}
				height={600}
				initialValues={
					title === "Articulos"
						? ArticuloManufacturadoInitialValues
						: SucursalInitialValues
				}
				validationSchemas={
					title === "Articulos"
						? ArticuloManufacturadoValidationSchemas
						: SucursalValidationSchemas
				}
				postUrl={
					title === "Articulos"
						? CONSTANTS.manufacturado.postURL
						: CONSTANTS.sucursal.postURL
				}
				steps={
					title === "Articulos"
						? ArticuloManufacturadoFormSteps
						: SucursalFormSteps
				}
				substepDefault={false}
			/>
		</>
	);
};
