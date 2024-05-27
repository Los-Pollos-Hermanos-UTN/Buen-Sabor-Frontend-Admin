import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableDeleteButtonProps {
	handleClick: () => void;
	width?: string;
	height?: string;
}

export function TableDeleteButton({ handleClick }: TableDeleteButtonProps) {
	return (
		<Tooltip title="Eliminar" placement="bottom" arrow>
			<IconButton
				type="submit"
				sx={{
					borderRadius: "8px",
					height: "30px",
					width: "30px",
					backgroundColor: "#fff",
				}}
				aria-label="delete"
				onClick={handleClick}
			>
				<DeleteIcon />
			</IconButton>
		</Tooltip>
	);
}
