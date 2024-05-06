import { Button } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

interface BackButtonProps {
	onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
	return (
		<Button
			onClick={onClick}
			sx={{
				height: 40,
				backgroundColor: "#49111C",
				borderRadius: "40px",
			}}
		>
			<KeyboardBackspaceOutlinedIcon
				sx={{
					color: "#fff",
				}}
			/>
		</Button>
	);
}
