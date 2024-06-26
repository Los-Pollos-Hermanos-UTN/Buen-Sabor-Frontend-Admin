import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import {
	ArticuloManufacturado,
	manufacturadoColumns,
} from "../types/Manufacturado";
import { getConstants } from "../constants/constants";
import { deleteData, getData } from "../services/RequestExecutor";
import { FormModal } from "../components/modals/FormModal";
import {
	ArticuloManufacturadoFormSteps,
	ArticuloManufacturadoInitialValues,
	ArticuloManufacturadoValidationSchemas,
} from "../components/forms/manufacturado/ManufacturadoFormData";
import { searchInObject } from "../utils/SearchUtils";
import { ManufacturadoDetailModal } from "../components/modals/details/ManufacturadoDetailModal.";

export const ManufacturadosPage = () => {
	const CONSTANTS = getConstants();
	const [searchTerm, setSearchTerm] = useState("");

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedManufacturado, setSelectedManufacturado] =
		useState<ArticuloManufacturado | null>(null);
	const [manufacturados, setManufacturados] = useState<ArticuloManufacturado[]>(
		[]
	);

	const [detailOpen, setDetailOpen] = useState<boolean>(false);
	const [detailManufacturado, setDetailManufacturado] =
		useState<ArticuloManufacturado | null>(null);

	useEffect(() => {
		const getManufacturados = async () => {
			try {
				const response = await getData<ArticuloManufacturado[]>(
					CONSTANTS.manufacturado.getUrl
				);
				setManufacturados(response);
			} catch (error) {
				console.error(error);
			}
		};
		getManufacturados();
	}, [open]);

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const filteredManufactured = manufacturados.filter((manufactured) =>
		searchInObject(manufactured, searchTerm)
	);

	const handleEdit = (manufacturado: ArticuloManufacturado) => {
		setSelectedManufacturado(manufacturado);
		handleOpen();
	};

	const handleDelete = async (manufacturado: ArticuloManufacturado) => {
		try {
			await deleteData(
				`${CONSTANTS.manufacturado.deleteURL}${manufacturado.id}`
			);
			setManufacturados((prevManufacturado) =>
				prevManufacturado.filter((item) => item.id !== manufacturado.id)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleShowInfo = (manufacturado: ArticuloManufacturado) => {
		setDetailManufacturado(manufacturado);
		setDetailOpen(true);
	};

	return (
		<>
			<Stack direction="column" m="3%" spacing={5}>
				<SearchBar onSearch={handleSearch} handleOpen={handleOpen} />
				<CustomTable<ArticuloManufacturado>
					data={filteredManufactured}
					columns={manufacturadoColumns}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
					handleShowInfo={handleShowInfo}
				/>
			</Stack>
			<FormModal
				title={
					!!selectedManufacturado
						? "Editar Producto Manufacturado"
						: "Agregar Producto Manufacturado"
				}
				open={open}
				handleClose={() => {
					setSelectedManufacturado(null);
					handleClose();
				}}
				width={0}
				height={600}
				initialValues={
					!!selectedManufacturado
						? selectedManufacturado
						: ArticuloManufacturadoInitialValues
				}
				validationSchemas={ArticuloManufacturadoValidationSchemas}
				postUrl={CONSTANTS.manufacturado.postURL}
				putUrl={`${CONSTANTS.manufacturado.putURL}${selectedManufacturado?.id}`}
				isEdit={!!selectedManufacturado}
				steps={ArticuloManufacturadoFormSteps}
				substepDefault={false}
			/>
			{detailOpen && detailManufacturado && (
				<ManufacturadoDetailModal
					manufacturado={detailManufacturado}
					width={800}
					open={detailOpen}
					handleClose={() => setDetailOpen(false)}
				/>
			)}
		</>
	);
};
