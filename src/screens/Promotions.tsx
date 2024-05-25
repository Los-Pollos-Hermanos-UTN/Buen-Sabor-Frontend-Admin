import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { Promocion, promotionColumns } from "../types/Promocion";
import { searchInObject } from "../utils/SearchUtils";
import { FormModal } from "../components/modals/FormModal";
import { getConstants } from "../constants/constants";
import { getData, deleteData } from "../services/RequestExecutor";
import {
	PromocionFormSteps,
	PromocionInitialValues,
	PromocionValidationSchemas,
} from "../components/forms/promocion/PromocionFormData";

export const Promotions = () => {
	const CONSTANTS = getConstants();
	const [searchTerm, setSearchTerm] = useState("");

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedPromotion, setSelectedPromotion] = useState<Promocion | null>(
		null
	);
	const [promociones, setPromociones] = useState<Promocion[]>([]);

	useEffect(() => {
		const getPromociones = async () => {
			try {
				const response = await getData<Promocion[]>(
					CONSTANTS.promociones.getUrl
				);
				setPromociones(response);
			} catch (error) {
				console.error(error);
			}
		};
		getPromociones();
	}, [open]);

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const filteredPromociones = promociones.filter((promocion) =>
		searchInObject(promocion, searchTerm)
	);

	const handleEdit = (promocion: Promocion) => {
		setSelectedPromotion(promocion);
		handleOpen();
	};

	const handleDelete = async (promocion: Promocion) => {
		try {
			await deleteData(`${CONSTANTS.promociones.deleteURL}${promocion.id}`);
			setPromociones((prevPromocion) =>
				prevPromocion.filter((item) => item.id !== promocion.id)
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Stack direction="column" m="3%" spacing={5}>
				<SearchBar onSearch={handleSearch} handleOpen={handleOpen} />
				<CustomTable<Promocion>
					data={filteredPromociones}
					columns={promotionColumns}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			</Stack>
			<FormModal
				title={!!selectedPromotion ? "Editar Promoción" : "Agregar Promoción"}
				open={open}
				handleClose={() => {
					setSelectedPromotion(null);
					handleClose();
				}}
				width={0}
				height={600}
				initialValues={
					!!selectedPromotion ? selectedPromotion : PromocionInitialValues
				}
				validationSchemas={PromocionValidationSchemas}
				postUrl={CONSTANTS.promociones.postURL}
				putUrl={`${CONSTANTS.promociones.putURL}${selectedPromotion?.id}`}
				isEdit={!!selectedPromotion}
				steps={PromocionFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
