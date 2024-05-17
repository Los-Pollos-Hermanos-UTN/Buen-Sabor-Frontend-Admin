import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { ArticuloInsumo, insumoColumns } from "../types/Insumo";
import { CONSTANTS } from "../constants/constants";
import { getData } from "../services/RequestExecutor";
import { FormModal } from "../components/modals/FormModal";
import {
	InsumoFormSteps,
	InsumoInitialValues,
	InsumoValidationSchemas,
} from "../components/forms/insumo/InsumoFormData";

export const InsumosPage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);

	useEffect(() => {
		const getInsumos = async () => {
			try {
				const response = await getData<ArticuloInsumo[]>(
					CONSTANTS.insumo.getUrl
				);
				setInsumos(response);
			} catch (error) {
				console.error(error);
			}
		};
		getInsumos();
	}, []);

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const filteredSupplies = insumos.filter((product) =>
		Object.values(product).some((value) =>
			value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<>
			<Stack direction="column" m="3%" spacing={5}>
				<SearchBar onSearch={handleSearch} handleOpen={handleOpen} />
				<CustomTable<ArticuloInsumo>
					data={filteredSupplies}
					columns={insumoColumns}
					handleDelete={() => {}}
				/>
			</Stack>
			<FormModal
				title={"Agregar Insumo"}
				open={open}
				handleClose={handleClose}
				width={0}
				height={600}
				initialValues={InsumoInitialValues}
				validationSchemas={InsumoValidationSchemas}
				postUrl={CONSTANTS.insumo.postURL}
				steps={InsumoFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
