import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Categoria } from "../../types/Categoria";
import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Stack,
} from "@mui/material";
import { FC, useState } from "react";
import { FormModal } from "../modals/FormModal";
import {
	CategoriaFormSteps,
	CategoriaInitialValues,
	CategoriaValidationSchemas,
} from "../forms/categoria/CategoriaFormData";
import { CONSTANTS } from "../../constants/constants";
import { AddButton } from "./AddButton";

interface CategoriaButtonProps {
	categoria: Categoria;
}

export const CategoriaButton: FC<CategoriaButtonProps> = ({ categoria }) => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [expanded, setExpanded] = useState<string | false>(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	return (
		<>
			<Accordion
				expanded={expanded === categoria.denominacion}
				onChange={handleChange(categoria.denominacion)}
				sx={{
					boxShadow: "none",
					"&:before": {
						display: "none",
					},
					"&$expanded": {
						margin: "auto",
					},
					borderRadius: "10px",
					border: "none",
				}}
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						width="100%"
						mr="1%"
					>
						<Typography>{categoria.denominacion}</Typography>
						<AddButton width="30px" height="30px" handleClick={handleOpen} />
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					{categoria.subCategorias?.map((subCategoria) => (
						<CategoriaButton
							key={subCategoria.denominacion}
							categoria={subCategoria}
						/>
					))}
				</AccordionDetails>
			</Accordion>
			{open && (
				<FormModal
					title={"Crear Subcategoria"}
					open={open}
					handleClose={handleClose}
					width={0}
					height={600}
					initialValues={{ ...CategoriaInitialValues, padreId: categoria.id }} // Asignamos padreId
					validationSchemas={CategoriaValidationSchemas}
					postUrl={CONSTANTS.categorias.postURL}
					steps={CategoriaFormSteps}
					substepDefault={false}
				/>
			)}
		</>
	);
};
