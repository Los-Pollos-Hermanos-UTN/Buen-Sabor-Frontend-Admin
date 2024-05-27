import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { EditButton } from "../components/buttons/EditButton";
import { BranchCard } from "../components/cards/BranchCard";
import { useEffect, useState } from "react";
import { Sucursal } from "../types/Sucursal";
import { getData } from "../services/RequestExecutor";
import { getConstants } from "../constants/constants";
import {
	SucursalFormSteps,
	SucursalInitialValues,
	SucursalValidationSchemas,
} from "../components/forms/sucursal/SucursalFormData";
import { FormModal } from "../components/modals/FormModal";
import { AddButton } from "../components/buttons/AddButton";
import {
	EmpresaFormSteps,
	EmpresaValidationSchemas,
} from "../components/forms/empresa/EmpresaFormData";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Company = () => {
	const CONSTANTS = getConstants();
	const empresa = useSelector(
		(state: RootState) => state.empresa.selectedEmpresa
	);

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [openEmpresaForm, setOpenEmpresaForm] = useState<boolean>(false);
	const handleOpenEmpresaForm = () => setOpenEmpresaForm(true);
	const handleCloseEmpresaForm = () => setOpenEmpresaForm(false);

	const [selectedSucursal, setSelectedSucursal] = useState<Sucursal | null>(
		null
	);
	const [sucursales, setSucursales] = useState<Sucursal[]>([]);

	useEffect(() => {
		const getSucursales = async () => {
			try {
				const response = await getData<Sucursal[]>(CONSTANTS.sucursal.getUrl);
				setSucursales(response);
			} catch (error) {
				console.error(error);
			}
		};
		getSucursales();
	}, [open]);

	const handleEdit = (sucursal: Sucursal) => {
		setSelectedSucursal(sucursal);
		handleOpen();
	};

	// Dejo la funcionalidad de eliminación por si se necesita
	// const handleDelete = async (sucursal: Sucursal) => {
	// 	try {
	// 		await deleteData(`${CONSTANTS.sucursal.deleteURL}${sucursal.id}`);
	// 		setSucursales((prevSucursales) =>
	// 			prevSucursales.filter((item) => item.id !== sucursal.id)
	// 		);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	return (
		<>
			<Stack direction="column" m="3%" spacing={3}>
				<Stack direction="row" spacing={3}>
					<Stack direction="row" width="100%">
						<Stack width="90%">
							<Typography fontSize="38px" fontWeight="bold" color="#49111C">
								{empresa?.nombre}
							</Typography>
							<Typography variant="h6" fontSize="30px" color="#5E503F">
								Sucursales
							</Typography>
						</Stack>
						<Stack width="10%" spacing={1} justifyContent="flex-end">
							<EditButton
								handleClick={handleOpenEmpresaForm}
								tooltipPlacement="left"
								tooltipText="Editar Empresa"
							/>
							<AddButton
								handleClick={handleOpen}
								tooltipPlacement="left"
								tooltipText="Agregar Sucursal"
							/>
						</Stack>
					</Stack>
				</Stack>
				<Stack direction="row" flexWrap="wrap" justifyContent="center">
					{sucursales.map((s) => (
						<Box m="1%">
							<BranchCard sucursal={s} handleEdit={handleEdit} />
						</Box>
					))}
				</Stack>
			</Stack>
			<FormModal
				title={!!selectedSucursal ? "Editar Sucursal" : "Agregar Sucursal"}
				open={open}
				handleClose={() => {
					setSelectedSucursal(null);
					handleClose();
				}}
				width={0}
				height={600}
				initialValues={
					!!selectedSucursal
						? selectedSucursal
						: { ...SucursalInitialValues, empresa }
				}
				validationSchemas={SucursalValidationSchemas}
				postUrl={CONSTANTS.sucursal.postURL}
				putUrl={`${CONSTANTS.sucursal.putURL}${selectedSucursal?.id}`}
				isEdit={!!selectedSucursal}
				steps={SucursalFormSteps}
				substepDefault={false}
			/>
			<FormModal
				title={"Editar Empresa"}
				open={openEmpresaForm}
				handleClose={handleCloseEmpresaForm}
				width={0}
				height={450}
				initialValues={empresa}
				validationSchemas={EmpresaValidationSchemas}
				postUrl={CONSTANTS.sucursal.postURL}
				putUrl={CONSTANTS.empresa.putURL}
				isEdit={true}
				steps={EmpresaFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
