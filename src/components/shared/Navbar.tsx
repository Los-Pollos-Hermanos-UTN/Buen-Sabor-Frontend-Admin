import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarProps {
    title: string;
	drawerWidth?: number;
	handleDrawerToggle: () => void;
}

export function Navbar({ title, drawerWidth, handleDrawerToggle }: NavbarProps) {
	return (
		<AppBar
			position="fixed"
			sx={{
                backgroundColor: "#49111C",
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` },
			}}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { sm: "none" } }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h5" fontFamily="Roboto" noWrap component="div">
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
