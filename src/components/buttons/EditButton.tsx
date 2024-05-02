import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export function EditButton() {
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
			aria-label="edit"
		>
			<EditIcon sx={{ color: "#fff" }} />
		</IconButton>
	);
}