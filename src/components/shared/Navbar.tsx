import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Tooltip, Avatar, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout as reduxLogout } from "../../features/auth/AuthSlice";
import { RootState } from "../../store/store";
import { useAuth0 } from "@auth0/auth0-react";

interface NavbarProps {
	title: string;
	drawerWidth?: number;
	handleDrawerToggle: () => void;
}

export function NavBar({
	title,
	drawerWidth,
	handleDrawerToggle,
}: NavbarProps) {
	const { logout } = useAuth0();

	const dispatch = useDispatch();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const userRole = useSelector((state: RootState) => state.auth.userRole);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		dispatch(reduxLogout());
		logout({ logoutParams: { returnTo: window.location.origin } });
		handleCloseUserMenu();
	};

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
				<Stack
					width="100%"
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Stack direction="row" justifyContent="space-between" width="95%">
						<Typography variant="h5" fontFamily="Roboto" noWrap component="div">
							{title}
						</Typography>
						<Typography variant="h5" fontFamily="Roboto" noWrap component="div">
							{`${userRole?.charAt(0).toUpperCase()}${userRole?.substring(1)}`}
						</Typography>
					</Stack>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Opciones de perfil">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem key="logout" onClick={handleLogout}>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
