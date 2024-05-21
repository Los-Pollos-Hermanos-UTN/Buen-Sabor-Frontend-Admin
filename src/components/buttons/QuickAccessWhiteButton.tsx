import { Button, Typography } from "@mui/material";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Action } from "../../types/enums/Enums";

interface WhiteButtonProp {
	icon: ReactElement;
	text: string;
	action?: Action;
	handleOpen?: () => void;
	navigateTo?: string;
}

export const QuickAccessWhiteButton = ({
	icon,
	text,
	action,
	handleOpen,
	navigateTo,
}: WhiteButtonProp) => {
	const navigate = useNavigate();

	const handleClick = () => {
		if (action === Action.CREATE && handleOpen) {
			handleOpen();
		} else if (action === Action.LIST && navigateTo) {
			navigate(navigateTo);
		}
	};

	return (
		<Button
			sx={{
				color: "white",
				textTransform: "capitalize",
				width: "100%",
				justifyContent: "flex-start",
			}}
			startIcon={icon}
			onClick={handleClick}
		>
			<Typography>{text}</Typography>
		</Button>
	);
};
