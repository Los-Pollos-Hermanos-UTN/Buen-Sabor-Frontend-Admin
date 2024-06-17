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
import { login, setUserRole } from "../features/auth/AuthSlice";
import { selectEmpresa } from "../features/empresa/EmpresaSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const InicioSesion = () => {
	const CONSTANTS = getConstants();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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

				localStorage.setItem("Token", token);

				if (token) {
					const response = await getData<Empresa[]>(CONSTANTS.empresa.getUrl);
					setEmpresas(response);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getEmpresas();
	}, [open]);

	useEffect(() => {
		const fetchUserRole = async () => {
			try {
				const token = await getAccessTokenSilently({
					authorizationParams: {
						audience: import.meta.env.VITE_AUTH0_AUDIENCE,
					},
				});

				const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/role`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await response.json();
				dispatch(setUserRole(data.role)); // Despacha la acción para establecer el rol
				console.log("Rol del usuario:", data.role);
			} catch (error) {
				console.error("Error fetching user role:", error);
			}
		};

		fetchUserRole();
	}, [getAccessTokenSilently, dispatch]);

	const handleSelectEmpresa = (empresa: Empresa) => {
		dispatch(selectEmpresa(empresa));
		dispatch(login());
		navigate("/pedidos");
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
