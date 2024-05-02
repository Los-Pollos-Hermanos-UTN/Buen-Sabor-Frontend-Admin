import { Box, InputBase, Stack } from "@mui/material";
import { SearchButton } from "../buttons/SearchButton";
import { AddButton } from "../buttons/AddButton";

interface SearchBarProps {
	extraButtons?: JSX.Element[];
}

export function SearchBar({ extraButtons }: SearchBarProps) {
	return (
		<Stack direction="row" spacing={1}>
			<Box width="70%">
				<InputBase
					placeholder="Buscar…"
					inputProps={{ "aria-label": "search" }}
					sx={{
						flex: 1,
						backgroundColor: "#fff",
						borderRadius: "5px",
						height: "50px",
						width: "100%",
						pl: "3%",
					}}
				/>
			</Box>
			<SearchButton />
			<AddButton />
			{extraButtons}
		</Stack>
	);
}
