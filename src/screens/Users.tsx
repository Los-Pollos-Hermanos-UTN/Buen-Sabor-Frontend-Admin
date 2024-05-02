import { Stack } from "@mui/material";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { useWindowResize } from "../hooks/useWindowResize";
import { hardcodedUsers } from "../data/hardcodedUsers";
import { User, userColumns } from "../types/User";

export const Users = () => {
	const { isSmall } = useWindowResize();

	return (
		<Stack direction="column" m="3%" spacing={5}>
			<SearchBar />
			<CustomTable<User>
				data={hardcodedUsers}
				columns={userColumns}
				handleDelete={() => {}}
			/>
		</Stack>
	);
};