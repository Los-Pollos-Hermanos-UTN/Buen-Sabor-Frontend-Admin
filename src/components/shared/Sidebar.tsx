import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import { NavBar } from "./Navbar";

const drawerItems = [
	{
		name: "Pollos Hermanos",
		style: {
			height: "55px",
			borderRadius: "10px",
		},
		route: "/empresa",
		icon: <AccountCircleOutlinedIcon />,
	},
	{
		name: "Inicio",
		style: {
			backgroundColor: "#E8E8E8",
			borderRadius: "10px",
		},
		route: "/",
		icon: <DataUsageOutlinedIcon />,
	},
	{ name: "Productos", route: "/productos", icon: <WalletOutlinedIcon /> },
	{ name: "Promociones", route: "/promociones", icon: <SellOutlinedIcon /> },
	{ name: "Empresa", route: "/empresa", icon: <FolderSharedOutlinedIcon /> },
	{ name: "Usuarios", route: "/usuarios", icon: <PeopleAltOutlinedIcon /> },
	{ name: "Categorias", route: "/categorias", icon: <StyleOutlinedIcon /> },
];

interface SidebarProps {
	drawerWidth?: number;
}

export function SideBar({ drawerWidth }: SidebarProps) {
	const location = useLocation();
	const currentPathname = location.pathname;
	const currentRouteName =
		currentPathname.charAt(1).toUpperCase() + currentPathname.slice(2);

	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	const MyDrawer = (
		<Stack justifyContent="center">
			{drawerItems.map((item) => (
				<ListItem key={item.name} component={Link} to={item.route}>
					<ListItemButton
						sx={{ ...item.style, color: "black", borderRadius: "10px" }}
					>
						<Stack direction="row" spacing={1}>
							{item.icon}
							<ListItemText primary={item.name} />
						</Stack>
					</ListItemButton>
				</ListItem>
			))}
		</Stack>
	);

	return (
		<>
			<CssBaseline />
			<NavBar
				title={currentRouteName}
				drawerWidth={drawerWidth}
				handleDrawerToggle={handleDrawerToggle}
			/>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onTransitionEnd={handleDrawerTransitionEnd}
					onClose={handleDrawerClose}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{MyDrawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{MyDrawer}
				</Drawer>
			</Box>
		</>
	);
}