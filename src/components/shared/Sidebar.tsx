import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import { Navbar } from "./Navbar";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DataUsageOutlinedIcon from '@mui/icons-material/DataUsageOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';

const drawerItems = [
	{
		name: "Pollos Hermanos",
		style: {
      height: '55px',
			borderRadius: "10px",
		},
		icon: <AccountCircleOutlinedIcon />,
	},
	{
		name: "Inicio",
		style: {
			backgroundColor: "#E8E8E8",
			borderRadius: "10px",
		},
		icon: <DataUsageOutlinedIcon />,
	},
	{ name: "Productos", icon: <WalletOutlinedIcon /> },
	{ name: "Promociones", icon: <SellOutlinedIcon /> },
	{ name: "Empresa", icon: <FolderSharedOutlinedIcon /> },
	{ name: "Usuarios", icon: <PeopleAltOutlinedIcon /> },
	{ name: "Categorias", icon: <StyleOutlinedIcon /> },
];
const drawerWidth = 240;

const MyDrawer = (
	<Stack justifyContent="center">
		{drawerItems.map((item) => (
			<ListItem key={item.name}>
				<ListItemButton sx={item.style ? item.style : { borderRadius: "10px" }}>
					<Stack direction="row" spacing={1}>
						{item.icon}
						<ListItemText primary={item.name} />
					</Stack>
				</ListItemButton>
			</ListItem>
		))}
	</Stack>
);

export function Sidebar() {
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

	return (
		<Box sx={{ display: "flex" }}>
			<Navbar
				title="El Buen Sabor"
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
		</Box>
	);
}
