import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { getConstants } from "../constants/constants";
import { deleteData, getData } from "../services/RequestExecutor";
import { FormModal } from "../components/modals/FormModal";
import { searchInObject } from "../utils/SearchUtils";
import { Empleado, empleadoColumns } from "../types/Empleado";
import {
	EmpleadoFormSteps,
	EmpleadoInitialValues,
	EmpleadoValidationSchemas,
} from "../components/forms/usuario/EmpleadoFormData";
import { EmpleadoDetailModal } from "../components/modals/details/EmpleadoDetailModal";

export const Users = () => {
	const CONSTANTS = getConstants();
	const [searchTerm, setSearchTerm] = useState("");

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(
		null
	);
	const [empleados, setEmpleados] = useState<Empleado[]>([]);

	const [detailOpen, setDetailOpen] = useState<boolean>(false);
	const [detailEmpleado, setDetailEmpleado] = useState<Empleado | null>(null);

	useEffect(() => {
		const getEmpleados = async () => {
			try {
				const response = await getData<Empleado[]>(CONSTANTS.empleados.getUrl);
				setEmpleados(response);
			} catch (error) {
				console.error(error);
			}
		};
		getEmpleados();
	}, [open]);

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const filteredEmpleados = empleados.filter((empleado) =>
		searchInObject(empleado, searchTerm)
	);

	const handleEdit = (empleado: Empleado) => {
		setSelectedEmpleado(empleado);
		handleOpen();
	};

	const handleDelete = async (empleado: Empleado) => {
		try {
			await deleteData(`${CONSTANTS.empleados.deleteURL}${empleado.id}`);
			setEmpleados((prevEmpleado) =>
				prevEmpleado.filter((item) => item.id !== empleado.id)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleShowInfo = (empleado: Empleado) => {
		setDetailEmpleado(empleado);
		setDetailOpen(true);
	};

	return (
		<>
			<Stack direction="column" m="3%" spacing={5}>
				<SearchBar onSearch={handleSearch} handleOpen={handleOpen} />
				<CustomTable<Empleado>
					data={filteredEmpleados}
					columns={empleadoColumns}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
					handleShowInfo={handleShowInfo}
				/>
			</Stack>
			<FormModal
				title={!!selectedEmpleado ? "Editar Empleado" : "Agregar Empleado"}
				open={open}
				handleClose={() => {
					setSelectedEmpleado(null);
					handleClose();
				}}
				width={800}
				height={600}
				initialValues={
					!!selectedEmpleado ? selectedEmpleado : EmpleadoInitialValues
				}
				validationSchemas={EmpleadoValidationSchemas}
				postUrl={CONSTANTS.empleados.postURL}
				putUrl={`${CONSTANTS.empleados.putURL}${selectedEmpleado?.id}`}
				isEdit={!!selectedEmpleado}
				steps={EmpleadoFormSteps}
				substepDefault={false}
			/>
			{detailEmpleado && (
				<EmpleadoDetailModal
					open={detailOpen}
					handleClose={() => setDetailOpen(false)}
					empleado={detailEmpleado}
				/>
			)}
		</>
	);
};
