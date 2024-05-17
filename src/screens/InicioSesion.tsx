import { Fab, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../constants/constants";
import { getData } from "../services/RequestExecutor";
import { Empresa } from "../types/Empresa";
import { SelectorEmpresa } from "../components/buttons/SelectorEmpresa";
import AddIcon from "@mui/icons-material/Add";
import { FormModal } from "../components/modals/FormModal";
import {
	EmpresaFormSteps,
	EmpresaInitialValues,
	EmpresaValidationSchemas,
} from "../components/forms/empresa/EmpresaFormData";

interface InicioSesionProps {
	setIsAuthenticated: (value: boolean) => void;
}

export const InicioSesion = ({ setIsAuthenticated }: InicioSesionProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [empresas, setEmpresas] = useState<Empresa[]>([]);

	useEffect(() => {
		const getEmpresas = async () => {
			try {
				const response = await getData<Empresa[]>(CONSTANTS.empresa.getUrl);
				setEmpresas(response);
			} catch (error) {
				console.error(error);
			}
		};
		getEmpresas();
	}, []);

	return (
		<>
			<Stack direction="row" m="3%" spacing={5} alignItems="center">
				{empresas.map((empresa) => (
					<SelectorEmpresa
						key={empresa.id}
						empresa={empresa}
						onInit={() => setIsAuthenticated(true)}
					/>
				))}
				<Fab
					color="primary"
					aria-label="add"
					sx={{
						backgroundColor: "#49111C",
						"&:hover": { backgroundColor: "#361015" },
					}}
					onClick={handleOpen}
				>
					<AddIcon />
				</Fab>
			</Stack>
			<FormModal
				title="Agregar Empresa"
				open={open}
				handleClose={handleClose}
				width={700}
				height={400}
				initialValues={EmpresaInitialValues}
				validationSchemas={EmpresaValidationSchemas}
				postUrl={CONSTANTS.empresa.postURL}
				steps={EmpresaFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
