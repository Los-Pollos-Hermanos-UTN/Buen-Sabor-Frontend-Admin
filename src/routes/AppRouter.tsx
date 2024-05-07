import { Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home";
import { Categories } from "../screens/Categories";
import { Company } from "../screens/Company";
import { Products } from "../screens/Products";
import { Users } from "../screens/Users";
import { Box, Toolbar } from "@mui/material";
import { Promotions } from "../screens/Promotions";
import { SideBar } from "../components/shared/Sidebar";

const drawerWidth: number = 240;

export const AppRouter = () => {
	return (
		<Box
			sx={{
				display: "flex",
				backgroundColor: "#E8E8E8",
				minWidth: "100vw",
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
					<Route path="/productos" element={<Products />} />
					<Route path="/promociones" element={<Promotions />} />
					<Route path="/empresa" element={<Company />} />
					<Route path="/usuarios" element={<Users />} />
					<Route path="/categorias" element={<Categories />} />
				</Routes>
			</Box>
		</Box>
	);
};
