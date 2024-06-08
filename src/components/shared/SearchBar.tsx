import { Box, IconButton, InputBase, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";
import { AddButton } from "../buttons/AddButton";
import { useState } from "react";

interface SearchBarProps {
	extraButtons?: JSX.Element[];
	showAddButton?: boolean;
	onSearch?: (searchTerm: string) => void;
	handleOpen?: () => void;
}

export function SearchBar({
	extraButtons,
	showAddButton = true,
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

	const handleSearchClick = () => {
		if (onSearch) {
			onSearch(searchTerm);
		}
	};

	return (
		<Stack direction="row" spacing={1}>
			<Box
				width="70%"
				display="flex"
				alignItems="center"
				bgcolor="#fff"
				borderRadius="5px"
				height="50px"
			>
				<InputBase
					placeholder="Buscar…"
					inputProps={{ "aria-label": "search" }}
					sx={{
						flex: 1,
						pl: "30px",
					}}
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				<IconButton
					onClick={handleSearchClick}
					sx={{ p: "10px", mr: "10px" }}
					aria-label="search"
				>
					<Search />
				</IconButton>
			</Box>
			{showAddButton && <AddButton handleClick={handleOpen!} />}
			{extraButtons}
		</Stack>
	);
}
