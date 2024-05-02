import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export function AddButton() {
	return (
		<IconButton
			type="submit"
			sx={{
				p: "10px",
				borderRadius: "8px",
				height: "50px",
				width: "50px",
				backgroundColor: "#49111C",
			}}
			aria-label="search"
		>
			<AddIcon sx={{ color: "#fff" }} />
		</IconButton>
	);
}
