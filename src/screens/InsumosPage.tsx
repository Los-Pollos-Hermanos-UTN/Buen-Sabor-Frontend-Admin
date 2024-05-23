import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { ArticuloInsumo, insumoColumns } from "../types/Insumo";
import { getConstants } from "../constants/constants";
import { deleteData, getData } from "../services/RequestExecutor";
import { FormModal } from "../components/modals/FormModal";
import {
	InsumoFormSteps,
	InsumoInitialValues,
	InsumoValidationSchemas,
} from "../components/forms/insumo/InsumoFormData";
import { searchInObject } from "../utils/SearchUtils";

export const InsumosPage = () => {
	const CONSTANTS = getConstants();
	const [searchTerm, setSearchTerm] = useState("");

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedInsumo, setSelectedInsumo] = useState<ArticuloInsumo | null>(
		null
	);
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
	}, [open]);

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const filteredSupplies = insumos.filter((supply) =>
		searchInObject(supply, searchTerm)
	);

	const handleEdit = (insumo: ArticuloInsumo) => {
		setSelectedInsumo(insumo);
		handleOpen();
	};

	const handleDelete = async (insumo: ArticuloInsumo) => {
		try {
			await deleteData(`${CONSTANTS.insumo.deleteURL}${insumo.id}`);
			setInsumos((prevInsumos) =>
				prevInsumos.filter((item) => item.id !== insumo.id)
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Stack direction="column" m="3%" spacing={5}>
				<SearchBar onSearch={handleSearch} handleOpen={handleOpen} />
				<CustomTable<ArticuloInsumo>
					data={filteredSupplies}
					columns={insumoColumns}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			</Stack>
			<FormModal
				title={!!selectedInsumo ? "Editar Insumo" : "Agregar Insumo"}
				open={open}
				handleClose={() => {
					setSelectedInsumo(null);
					handleClose();
				}}
				width={0}
				height={600}
				initialValues={!!selectedInsumo ? selectedInsumo : InsumoInitialValues}
				validationSchemas={InsumoValidationSchemas}
				postUrl={CONSTANTS.insumo.postURL}
				putUrl={`${CONSTANTS.insumo.putURL}${selectedInsumo?.id}`}
				isEdit={!!selectedInsumo}
				steps={InsumoFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
