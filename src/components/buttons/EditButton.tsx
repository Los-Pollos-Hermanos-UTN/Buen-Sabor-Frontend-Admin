import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface EditButtonProps {
	handleClick: () => void;
	width?: string;
	height?: string;
}

export function EditButton({ handleClick, width, height }: EditButtonProps) {
	return (
		<IconButton
			type="submit"
			sx={{
				p: "10px",
				borderRadius: "8px",
				height: width ? width : "50px",
				width: height ? height : "50px",
				backgroundColor: "#49111C",
			}}
			aria-label="edit"
			onClick={handleClick}
		>
			<EditIcon sx={{ color: "#fff" }} />
		</IconButton>
	);
}
