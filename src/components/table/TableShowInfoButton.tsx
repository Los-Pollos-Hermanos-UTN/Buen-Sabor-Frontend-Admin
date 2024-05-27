import { IconButton, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface TableShowInfoButtonProps {
	handleClick: () => void;
	width?: string;
	height?: string;
}

export function TableShowInfoButton({ handleClick }: TableShowInfoButtonProps) {
	return (
		<Tooltip title="Ver Detalles" placement="bottom" arrow>
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
				<InfoOutlinedIcon />
			</IconButton>
		</Tooltip>
	);
}
