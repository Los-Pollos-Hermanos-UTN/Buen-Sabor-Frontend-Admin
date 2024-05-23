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
import { getConstants } from "../../constants/constants";
import { AddButton } from "./AddButton";
import { deleteData } from "../../services/RequestExecutor";
import { EditButton } from "./EditButton";
import { TableDeleteButton } from "../table/TableDeleteButton";

interface CategoriaButtonProps {
	categoria: Categoria;
}

export const CategoriaButton: FC<CategoriaButtonProps> = ({ categoria }) => {
	const CONSTANTS = getConstants();
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
		null
	);
	const [expanded, setExpanded] = useState<string | false>(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	const handleEdit = (categoria: Categoria) => {
		setSelectedCategoria(categoria);
		handleOpen();
	};

	const handleDelete = async (categoria: Categoria) => {
		try {
			await deleteData(`${CONSTANTS.categorias.deleteURL}${categoria.id}`);
		} catch (error) {
			console.error(error);
		}
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
						<Stack direction="row" spacing={1}>
							<AddButton width="30px" height="30px" handleClick={handleOpen} />
							<EditButton
								width="30px"
								height="30px"
								handleClick={() => handleEdit(categoria)}
							/>
							<TableDeleteButton handleClick={() => handleDelete(categoria)} />
						</Stack>
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
					title={
						!!selectedCategoria ? "Editar Categoría" : "Crear Subcategoria"
					}
					open={open}
					handleClose={() => {
						setSelectedCategoria(null);
						handleClose();
					}}
					width={0}
					height={600}
					initialValues={
						!!selectedCategoria
							? { ...selectedCategoria, padreId: categoria.id }
							: { ...CategoriaInitialValues, padreId: categoria.id }
					} // Asignamos padreId
					validationSchemas={CategoriaValidationSchemas}
					postUrl={CONSTANTS.categorias.postURL}
					putUrl={`${CONSTANTS.categorias.putURL}${selectedCategoria?.id}`}
					isEdit={!!selectedCategoria}
					steps={CategoriaFormSteps}
					substepDefault={false}
				/>
			)}
		</>
	);
};
