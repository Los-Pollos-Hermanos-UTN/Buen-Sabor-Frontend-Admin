import { Stack } from "@mui/material";
import { useState } from "react";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { useWindowResize } from "../hooks/useWindowResize";
import { hardcodedUsers } from "../data/hardcodedUsers";
import { User, userColumns } from "../types/User";

export const Users = () => {
	const { isSmall } = useWindowResize();

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const filteredUsers = hardcodedUsers.filter((product) =>
		Object.values(product).some((value) =>
			value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
	<Stack direction="column" m="3%" spacing={5}>
		<SearchBar onSearch={handleSearch}/>
		<CustomTable<User>
			data={filteredUsers}
			columns={userColumns}
			handleDelete={() => { }}
		/>
	</Stack>
	);
};