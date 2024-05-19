import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import {
	ArticuloManufacturado,
	manufacturadoColumns,
} from "../types/Manufacturado";
import { CONSTANTS } from "../constants/constants";
import { getData } from "../services/RequestExecutor";
import { FormModal } from "../components/modals/FormModal";
import {
	ArticuloManufacturadoFormSteps,
	ArticuloManufacturadoInitialValues,
	ArticuloManufacturadoValidationSchemas,
} from "../components/forms/manufacturado/ManufacturadoFormData";
import { searchInObject } from "../utils/SearchUtils";

export const ManufacturadosPage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [manufacturados, setManufacturados] = useState<ArticuloManufacturado[]>(
		[]
	);

	useEffect(() => {
		const getmanufacturados = async () => {
			try {
				const response = await getData<ArticuloManufacturado[]>(
					CONSTANTS.manufacturado.getUrl
				);
				setManufacturados(response);
			} catch (error) {
				console.error(error);
			}
		};
		getmanufacturados();
	}, [open]);

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const filteredManufactured = manufacturados.filter((manufactured) =>
		searchInObject(manufactured, searchTerm)
	);

	return (
		<>
			<Stack direction="column" m="3%" spacing={5}>
				<SearchBar onSearch={handleSearch} handleOpen={handleOpen} />
				<CustomTable<ArticuloManufacturado>
					data={filteredManufactured}
					columns={manufacturadoColumns}
					handleDelete={() => {}}
				/>
			</Stack>
			<FormModal
				title={"Agregar Producto Manufacturado"}
				open={open}
				handleClose={handleClose}
				width={0}
				height={600}
				initialValues={ArticuloManufacturadoInitialValues}
				validationSchemas={ArticuloManufacturadoValidationSchemas}
				postUrl={CONSTANTS.manufacturado.postURL}
				steps={ArticuloManufacturadoFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
