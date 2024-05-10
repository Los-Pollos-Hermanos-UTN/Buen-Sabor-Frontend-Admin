import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export function TableEditButton() {
	return (
		<IconButton
			type="submit"
			sx={{
				borderRadius: "8px",
				height: "30px",
				width: "30px",
				backgroundColor: "#fff",
			}}
			aria-label="edit"
		>
			<EditIcon />
		</IconButton>
	);
}
