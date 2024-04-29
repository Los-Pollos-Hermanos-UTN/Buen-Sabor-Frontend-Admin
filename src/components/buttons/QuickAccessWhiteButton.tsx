import { Button, Typography } from "@mui/material";
import { ReactElement } from "react";

interface WhiteButtonProp {
	icon: ReactElement;
	text: string;
}

export const QuickAccessWhiteButton = ({ icon, text }: WhiteButtonProp) => {
	return (
		<Button
			sx={{
				color: "white",
				textTransform: "capitalize",
				width: "50%",
                justifyContent: "flex-start"
			}}
			startIcon={icon}
		>
			<Typography>{text}</Typography>
		</Button>
	);
};
