import { Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home";
import { Categories } from "../screens/Categories";
import { Company } from "../screens/Company";
import { Products } from "../screens/Products";
import { Users } from "../screens/Users";
import { Sidebar } from "../components/shared/Sidebar";
import { Box, Toolbar } from "@mui/material";

const drawerWidth: number = 240;

export const AppRouter = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<Sidebar drawerWidth={drawerWidth} />
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
					<Route path="/productos" element={<Products />} />
					<Route path="/promociones" element={<Home />} />
					<Route path="/empresa" element={<Company />} />
					<Route path="/usuarios" element={<Users />} />
					<Route path="/categorias" element={<Categories />} />
				</Routes>	
			</Box>
		</Box>	
	);
};
