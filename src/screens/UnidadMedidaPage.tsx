import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { FormModal } from "../components/modals/FormModal";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { getConstants } from "../constants/constants";
import { getData, deleteData } from "../services/RequestExecutor";
import { searchInObject } from "../utils/SearchUtils";
import { UnidadMedida, unidadMedidaColumns } from "../types/UnidadMedida";
import {
	UnidadMedidaFormSteps,
	UnidadMedidaInitialValues,
	UnidadMedidaValidationSchemas,
} from "../components/forms/unidadMedida/UnidadMedidaFormData";

export const UnidadMedidaPage = () => {
	const CONSTANTS = getConstants();
	const [searchTerm, setSearchTerm] = useState("");

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedUnidadMedida, setSelectedUnidadMedida] =
		useState<UnidadMedida | null>(null);
	const [unidades, setUnidades] = useState<UnidadMedida[]>([]);

	useEffect(() => {
		const getUnidades = async () => {
			try {
				const response = await getData<UnidadMedida[]>(
					CONSTANTS.unidadMedida.getUrl
				);
				setUnidades(response);
			} catch (error) {
				console.error(error);
			}
		};
		getUnidades();
	}, [open]);

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const filteredUnidades = unidades.filter((unidad) =>
		searchInObject(unidad, searchTerm)
	);

	const handleEdit = (unidad: UnidadMedida) => {
		setSelectedUnidadMedida(unidad);
		handleOpen();
	};

	const handleDelete = async (unidad: UnidadMedida) => {
		try {
			await deleteData(`${CONSTANTS.unidadMedida.deleteURL}${unidad.id}`);
			setUnidades((prevUnidad) =>
				prevUnidad.filter((item) => item.id !== unidad.id)
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Stack m="3%" spacing={5}>
			<Stack spacing={5}>
				<SearchBar onSearch={handleSearch} handleOpen={handleOpen} />
				<CustomTable<UnidadMedida>
					data={filteredUnidades}
					columns={unidadMedidaColumns}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			</Stack>
			<FormModal
				title={
					!!selectedUnidadMedida
						? "Editar Unidad de Medida"
						: "Agregar Unidad de Medida"
				}
				open={open}
				handleClose={() => {
					setSelectedUnidadMedida(null);
					handleClose();
				}}
				width={600}
				height={300}
				initialValues={
					!!selectedUnidadMedida
						? selectedUnidadMedida
						: UnidadMedidaInitialValues
				}
				validationSchemas={UnidadMedidaValidationSchemas}
				postUrl={CONSTANTS.unidadMedida.postURL}
				putUrl={`${CONSTANTS.unidadMedida.putURL}${selectedUnidadMedida?.id}`}
				isEdit={!!selectedUnidadMedida}
				steps={UnidadMedidaFormSteps}
				substepDefault={false}
			/>
		</Stack>
	);
};
