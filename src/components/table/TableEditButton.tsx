import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export function TableEditButton() {
	return (
		<IconButton
			type="submit"
			sx={{
				p: "10px",
				borderRadius: "8px",
				height: "50px",
				width: "50px",
				backgroundColor: "#fff",
			}}
			aria-label="edit"
		>
			<EditIcon />
		</IconButton>
	);
}
