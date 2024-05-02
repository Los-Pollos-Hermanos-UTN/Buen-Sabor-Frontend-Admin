import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function TableDeleteButton() {
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
			aria-label="delete"
		>
			<DeleteIcon />
		</IconButton>
	);
}
