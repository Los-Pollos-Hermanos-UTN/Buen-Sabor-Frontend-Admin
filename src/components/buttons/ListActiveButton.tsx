import { Button } from "@mui/material";

export function ListActiveButton() {
	return (
		<Button
			type="submit"
			sx={{
				p: "10px 25px",
				borderRadius: "8px",
				height: "50px",
				backgroundColor: "#A9927D",
                textTransform: "none",
                fontSize: "15px",
                color: "#FFFFFF",
			}}
			aria-label="search"
		>
			Listar Activos
		</Button>
	);
}
