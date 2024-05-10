import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function TableDeleteButton() {
	return (
		<IconButton
			type="submit"
			sx={{
				borderRadius: "8px",
				height: "30px",
				width: "30px",
				backgroundColor: "#fff",
			}}
			aria-label="delete"
		>
			<DeleteIcon />
		</IconButton>
	);
}
