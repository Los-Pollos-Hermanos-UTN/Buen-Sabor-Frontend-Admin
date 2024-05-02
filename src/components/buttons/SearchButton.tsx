import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchButton() {
	return (
		<IconButton
			type="submit"
			sx={{
				p: "10px",
				borderRadius: "8px",
				height: "50px",
				width: "50px",
				backgroundColor: "#fff",
			}}
			aria-label="search"
		>
			<SearchIcon />
		</IconButton>
	);
}
