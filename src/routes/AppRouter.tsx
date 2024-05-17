import { Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home";
import { Categories } from "../screens/Categories";
import { Company } from "../screens/Company";
import { ManufacturadosPage } from "../screens/ManufacturadosPage";
import { Users } from "../screens/Users";
import { Box, Stack, Toolbar } from "@mui/material";
import { Promotions } from "../screens/Promotions";
import { SideBar } from "../components/shared/SideBar";
import { useState } from "react";
import { InicioSesion } from "../screens/InicioSesion";
import { InsumosPage } from "../screens/InsumosPage";

const drawerWidth: number = 240;

export const AppRouter = () => {
	// TODO: Login with redux / context
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

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
					<SideBar
						drawerWidth={drawerWidth}
						setIsAuthenticated={setIsAuthenticated}
					/>
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
							<Route path="/manufacturados" element={<ManufacturadosPage />} />
							<Route path="/insumos" element={<InsumosPage />} />
							<Route path="/promociones" element={<Promotions />} />
							<Route path="/empresa" element={<Company />} />
							<Route path="/usuarios" element={<Users />} />
							<Route path="/categorias" element={<Categories />} />
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
					<InicioSesion setIsAuthenticated={setIsAuthenticated} />
				</Stack>
			)}
		</>
	);
};
