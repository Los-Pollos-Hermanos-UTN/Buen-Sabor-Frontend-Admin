import { Stack } from "@mui/material";
import { useState } from "react";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { useWindowResize } from "../hooks/useWindowResize";
import { User, userColumns } from "../types/User";
import { searchInObject } from "../utils/SearchUtils";

export const Users = () => {
	const { isSmall } = useWindowResize();

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	// const filteredUsers = hardcodedUsers.filter((user) =>
	// 	searchInObject(user, searchTerm)
	// );

	return (
		<Stack direction="column" m="3%" spacing={5}>
			<SearchBar onSearch={handleSearch} />
			<CustomTable<User>
				data={[]}
				columns={userColumns}
				handleDelete={() => {}}
			/>
		</Stack>
	);
};
