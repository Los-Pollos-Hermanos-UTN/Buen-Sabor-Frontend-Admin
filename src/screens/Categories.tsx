import { Stack } from "@mui/material";
import { SearchBar } from "../components/shared/SearchBar";
import { Categoria } from "../types/Categoria";
import { CategoriaButton } from "../components/buttons/CategoriaButton";
import {
	CategoriaInitialValues,
	CategoriaValidationSchemas,
	CategoriaFormSteps,
} from "../components/forms/categoria/CategoriaFormData";
import { FormModal } from "../components/modals/FormModal";
import { useEffect, useState } from "react";
import { getConstants } from "../constants/constants";
import { deleteData, getData } from "../services/RequestExecutor";

export const Categories = () => {
	const CONSTANTS = getConstants();
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
		null
	);
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false); // Estado para forzar la recarga

	useEffect(() => {
		const getCategorias = async () => {
			try {
				const response = await getData<Categoria[]>(
					CONSTANTS.categorias.getUrl
				);
				setCategorias(response);
			} catch (error) {
				console.error(error);
			}
		};
		getCategorias();
	}, [open, refresh]);

	const handleEdit = (categoria: Categoria) => {
		setSelectedCategoria(categoria);
		handleOpen();
	};

	const handleDelete = async (categoria: Categoria) => {
		try {
			await deleteData(`${CONSTANTS.categorias.deleteURL}${categoria.id}`);
			setCategorias((prevCategorias) =>
				prevCategorias.filter((item) => item.id !== categoria.id)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const triggerRefresh = () => {
		setRefresh((prev) => !prev);
	};

	return (
		<>
			<Stack direction="column" m="3%" spacing={5}>
				<SearchBar handleOpen={handleOpen} />
				{categorias
					.filter((c) => c.padreId === null)
					.map((categoria) => (
						<CategoriaButton
							key={categoria.denominacion}
							categoria={categoria}
							onEdit={handleEdit}
							onDelete={handleDelete}
							triggerRefresh={triggerRefresh}
						/>
					))}
			</Stack>
			<FormModal
				title={!!selectedCategoria ? "Editar Categoria" : "Crear Categoria"}
				open={open}
				handleClose={() => {
					setSelectedCategoria(null);
					handleClose();
					triggerRefresh();
				}}
				width={0}
				height={600}
				initialValues={
					!!selectedCategoria ? selectedCategoria : CategoriaInitialValues
				}
				validationSchemas={CategoriaValidationSchemas}
				postUrl={CONSTANTS.categorias.postURL}
				putUrl={`${CONSTANTS.categorias.putURL}${selectedCategoria?.id}`}
				isEdit={!!selectedCategoria}
				steps={CategoriaFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
