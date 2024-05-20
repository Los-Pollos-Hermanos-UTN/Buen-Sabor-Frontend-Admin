import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
	handleClick: () => void;
	width?: string;
	height?: string;
}

export function AddButton({ handleClick, width, height }: AddButtonProps) {
	return (
		<IconButton
			type="submit"
			onClick={handleClick}
			sx={{
				p: "10px",
				borderRadius: "8px",
				height: width ? width : "50px",
				width: height ? height : "50px",
				backgroundColor: "#49111C",
			}}
			aria-label="search"
		>
			<AddIcon sx={{ color: "#fff" }} />
		</IconButton>
	);
}
