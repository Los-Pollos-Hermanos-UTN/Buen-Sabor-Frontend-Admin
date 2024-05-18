import { Stack } from "@mui/material";
import { useState } from "react";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { Promotion, promotionColumns } from "../types/Promotion";
import { ListActiveButton } from "../components/buttons/ListActiveButton";

export const Promotions = () => {

	const [searchTerm, setSearchTerm] = useState(""); 

	const handleSearch = (newSearchTerm: string) => { 
		setSearchTerm(newSearchTerm);
	};

	// const filteredPromotions = hardcodedPromotions.filter((product) =>
	// 	Object.values(product).some((value) =>
	// 		value.toString().toLowerCase().includes(searchTerm.toLowerCase())
	// 	)
	// );


	return (
		<Stack direction="column" m="3%" spacing={5}>
			<SearchBar extraButtons={[<ListActiveButton />]} onSearch={handleSearch} />
			<CustomTable<Promotion>
				data={[]}
				columns={promotionColumns}
				handleDelete={() => {}}
			/>
		</Stack>
	);
};
