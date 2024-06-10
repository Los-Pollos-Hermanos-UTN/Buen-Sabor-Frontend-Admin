import { Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home";
import { Categories } from "../screens/Categories";
import { Company } from "../screens/Company";
import { ManufacturadosPage } from "../screens/ManufacturadosPage";
import { Users } from "../screens/Users";
import { Box, Stack, Toolbar } from "@mui/material";
import { Promotions } from "../screens/Promotions";
import { SideBar } from "../components/shared/Sidebar";
import { InicioSesion } from "../screens/InicioSesion";
import { InsumosPage } from "../screens/InsumosPage";
import { UnidadMedidaPage } from "../screens/UnidadMedidaPage";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAuth0 } from "@auth0/auth0-react";
import { PedidosPage } from "../screens/PedidosPage";

const drawerWidth: number = 280;

export const AppRouter = () => {
  const { isAuthenticated: isAuth0Authenticated, isLoading, loginWithRedirect } = useAuth0();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth0Authenticated) {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });
    return null; // Return null while redirecting
  }

	return (
		<>
			{isAuthenticated ? (
				<Box
					sx={{
						display: "flex",
						backgroundColor: "#E8E8E8",
						minWidth: "90vw",
						width: "auto",
						minHeight: "100vh",
						height: "auto",
					}}
				>
					<SideBar drawerWidth={drawerWidth} />
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							width: { sm: `calc(100% - ${drawerWidth}px)` },
						}}
					>
						<Toolbar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/pedidos" element={<PedidosPage />} />
							<Route path="/manufacturados" element={<ManufacturadosPage />} />
							<Route path="/insumos" element={<InsumosPage />} />
							<Route path="/promociones" element={<Promotions />} />
							<Route path="/empresa" element={<Company />} />
							<Route path="/usuarios" element={<Users />} />
							<Route path="/categorias" element={<Categories />} />
							<Route path="/unidades" element={<UnidadMedidaPage />} />
						</Routes>
					</Box>
				</Box>
			) : (
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					width="100vw"
					height="100vh"
				>
					<InicioSesion />
				</Stack>
			)}
		</>
	);
};

export default AppRouter;