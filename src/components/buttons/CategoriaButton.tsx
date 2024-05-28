import React, { FC, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Categoria } from "../../types/Categoria";
import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Stack,
} from "@mui/material";
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
import { TableShowInfoButton } from "../table/TableShowInfoButton";
import { CategoriaDetailModal } from "../modals/details/CategoriaDetailModal"; // Importa el modal de detalles

interface CategoriaButtonProps {
	categoria: Categoria;
	onEdit: (categoria: Categoria) => void;
	onDelete: (categoria: Categoria) => void;
	triggerRefresh: () => void; // Prop para forzar la recarga
}

export const CategoriaButton: FC<CategoriaButtonProps> = ({
	categoria,
	onEdit,
	onDelete,
	triggerRefresh,
}) => {
	const CONSTANTS = getConstants();
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
		null
	);
	const [expanded, setExpanded] = useState<string | false>(false);

	// Estado para el modal de detalles
	const [detailOpen, setDetailOpen] = useState<boolean>(false);
	const [detailCategoria, setDetailCategoria] = useState<Categoria | null>(
		null
	);

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
			onDelete(categoria);
			triggerRefresh(); // Forzar la recarga después de la eliminación
		} catch (error) {
			console.error(error);
		}
	};

	const handleCloseModal = () => {
		setSelectedCategoria(null);
		handleClose();
		triggerRefresh(); // Forzar la recarga después de cerrar el modal
	};

	// Función para abrir el modal de detalles
	const handleShowInfo = (categoria: Categoria) => {
		setDetailCategoria(categoria);
		setDetailOpen(true);
	};

	const handleDetailClose = () => {
		setDetailOpen(false);
		setDetailCategoria(null);
	};

	return (
		<>
			<Accordion
				expanded={expanded === categoria.denominacion}
				onChange={handleChange(categoria.denominacion)}
				disableGutters
				sx={{
					boxShadow: "none",
					border: "1px solid rgba(224, 224, 224, 0.5)", // Gris más ligero y difuminado
					borderRadius: "8px",
					marginBottom: "8px",
					"&:before": {
						display: "none",
					},
					"&:first-of-type": {
						borderTopLeftRadius: "8px",
						borderTopRightRadius: "8px",
					},
					"&:last-of-type": {
						borderBottomLeftRadius: "8px",
						borderBottomRightRadius: "8px",
					},
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
							<TableShowInfoButton
								handleClick={() => handleShowInfo(categoria)}
							/>
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
							onEdit={onEdit}
							onDelete={onDelete}
							triggerRefresh={triggerRefresh} // Pasa triggerRefresh a subcategorias
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
					handleClose={handleCloseModal}
					width={0}
					height={600}
					initialValues={
						!!selectedCategoria
							? selectedCategoria
							: { ...CategoriaInitialValues, padreId: categoria.id }
					} // Asignamos padreId correctamente solo al crear
					validationSchemas={CategoriaValidationSchemas}
					postUrl={CONSTANTS.categorias.postURL}
					putUrl={
						!!selectedCategoria
							? `${CONSTANTS.categorias.putURL}${selectedCategoria.id}`
							: undefined
					}
					isEdit={!!selectedCategoria}
					steps={CategoriaFormSteps}
					substepDefault={false}
				/>
			)}
			{detailOpen && detailCategoria && (
				<CategoriaDetailModal
					categoria={detailCategoria}
					open={detailOpen}
					handleClose={handleDetailClose}
				/>
			)}
		</>
	);
};
