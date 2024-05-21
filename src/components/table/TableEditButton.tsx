import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface TableEditButtonProps {
	handleClick: () => void;
	width?: string;
	height?: string;
}

export function TableEditButton({ handleClick }: TableEditButtonProps) {
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
			onClick={handleClick}
		>
			<EditIcon />
		</IconButton>
	);
}
