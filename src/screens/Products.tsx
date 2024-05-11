import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { useWindowResize } from "../hooks/useWindowResize";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { Product, productColumns } from "../types/Product";
import { hardcodedProducts } from "../data/hardcodedProducts";

export const Products = () => {
	const { isSmall } = useWindowResize();

	const [searchTerm, setSearchTerm] = useState(""); 

	const handleSearch = (newSearchTerm: string) => { 
		setSearchTerm(newSearchTerm);
	};

	const filteredProducts = hardcodedProducts.filter((product) =>
		Object.values(product).some((value) =>
			value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<Stack direction="column" m="3%" spacing={5}>
			<SearchBar onSearch={handleSearch} /> 
			<CustomTable<Product>
				data={filteredProducts}
				columns={productColumns}
				handleDelete={() => {}}
			/>
		</Stack>
	);
};
