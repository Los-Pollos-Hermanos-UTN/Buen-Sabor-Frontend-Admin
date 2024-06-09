import { Fab, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { getConstants } from "../constants/constants";
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
import { useDispatch } from "react-redux";
import { login } from "../features/auth/AuthSlice";
import { selectEmpresa } from "../features/empresa/EmpresaSlice";
import { useAuth0 } from "@auth0/auth0-react";

export const InicioSesion = () => {
	const CONSTANTS = getConstants();
	const dispatch = useDispatch();
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	console.log(localStorage);

	const [empresas, setEmpresas] = useState<Empresa[]>([]);
	const { getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		const getEmpresas = async () => {
			try {
				const token = await getAccessTokenSilently({
					authorizationParams: {
						audience: import.meta.env.VITE_AUTH0_AUDIENCE,
					},
				});

				console.log("Token obtenido:", token);

				if (token) {
					const response = await getData<Empresa[]>(CONSTANTS.empresa.getUrl, token);
					setEmpresas(response);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getEmpresas();
	}, [open]);

	const handleSelectEmpresa = (empresa: Empresa) => {
		dispatch(selectEmpresa(empresa));
		dispatch(login());
	};

	return (
		<>
			<Stack direction="row" m="3%" spacing={5} alignItems="center">
				{empresas.map((empresa) => (
					<SelectorEmpresa
						key={empresa.id}
						empresa={empresa}
						onInit={() => handleSelectEmpresa(empresa)}
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
