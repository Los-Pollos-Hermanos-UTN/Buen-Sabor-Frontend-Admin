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
import { useState } from "react";
import { CONSTANTS } from "../constants/constants";

export const Categories = () => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const categorias: Categoria[] = [];

	return (
		<>
			<Stack direction="column" m="3%" spacing={5}>
				<SearchBar handleOpen={handleOpen} />
				{categorias.map((categoria) => (
					<CategoriaButton key={categoria.denominacion} categoria={categoria} />
				))}
			</Stack>
			<FormModal
				title={"Crear Categoria"}
				open={open}
				handleClose={handleClose}
				width={0}
				height={600}
				initialValues={CategoriaInitialValues}
				validationSchemas={CategoriaValidationSchemas}
				postUrl={CONSTANTS.categorias.postURL}
				steps={CategoriaFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
