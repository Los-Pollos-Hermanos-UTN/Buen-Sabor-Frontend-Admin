import { Box, InputBase, Stack } from "@mui/material";
import { SearchButton } from "../buttons/SearchButton";
import { AddButton } from "../buttons/AddButton";
import { useState } from "react";

interface SearchBarProps {
	extraButtons?: JSX.Element[];
	onSearch?: (searchTerm: string) => void;
	handleOpen?: () => void;
}

export function SearchBar({
	extraButtons,
	onSearch,
	handleOpen,
}: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		if (onSearch) {
			onSearch(event.target.value);
		}
	};

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
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</Box>
			<SearchButton />
			<AddButton handleClick={handleOpen!} />
			{extraButtons}
		</Stack>
	);
}
