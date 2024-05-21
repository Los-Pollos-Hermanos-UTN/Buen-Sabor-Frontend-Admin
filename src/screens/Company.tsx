import { Box, Stack, Typography } from "@mui/material";
import { EditButton } from "../components/buttons/EditButton";
import { BranchCard } from "../components/cards/BranchCard";
import { useEffect, useState } from "react";
import { Sucursal } from "../types/Sucursal";
import { getData } from "../services/RequestExecutor";
import { CONSTANTS } from "../constants/constants";
import {
	SucursalFormSteps,
	SucursalInitialValues,
	SucursalValidationSchemas,
} from "../components/forms/sucursal/SucursalFormData";
import { FormModal } from "../components/modals/FormModal";
import { AddButton } from "../components/buttons/AddButton";
import {
	EmpresaFormSteps,
	EmpresaInitialValues,
	EmpresaValidationSchemas,
} from "../components/forms/empresa/EmpresaFormData";

export const Company = () => {
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
							<Typography variant="h4" fontSize="35px" color="#49111C">
								Pollos Hermanos
							</Typography>
							<Typography variant="h6" fontSize="30px" color="#5E503F">
								Sucursales
							</Typography>
						</Stack>
						<Stack width="10%" spacing={1} justifyContent="flex-end">
							<EditButton handleClick={handleOpenEmpresaForm} />
							<AddButton handleClick={handleOpen} />
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
					!!selectedSucursal ? selectedSucursal : SucursalInitialValues
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
				height={600}
				initialValues={EmpresaInitialValues} // TODO: Modificar con estado GLOBAL DE EMPRESA
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
