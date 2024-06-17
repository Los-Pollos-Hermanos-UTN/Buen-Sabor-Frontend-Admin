import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
	handleClick: () => void;
	width?: string;
	height?: string;
	tooltipText?: string;
	tooltipPlacement?: "top" | "bottom" | "left" | "right";
	disabled?: boolean;
}

export function AddButton({
	handleClick,
	width,
	height,
	tooltipText,
	tooltipPlacement,
	disabled,
}: AddButtonProps) {
	return (
		<Tooltip title={tooltipText} placement={tooltipPlacement} arrow>
			<IconButton
				type="submit"
				onClick={handleClick}
				disabled={disabled}
				sx={{
					p: "10px",
					borderRadius: "8px",
					height: width ? width : "50px",
					width: height ? height : "50px",
					backgroundColor: "#49111C",
				}}
			>
				<AddIcon sx={{ color: "#fff" }} />
			</IconButton>
		</Tooltip>
	);
}
