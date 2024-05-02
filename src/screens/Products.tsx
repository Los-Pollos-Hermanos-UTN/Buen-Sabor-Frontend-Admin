import { Stack } from "@mui/material";

import { useWindowResize } from "../hooks/useWindowResize";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { Product, productColumns } from "../types/Product";
import { hardcodedProducts } from "../data/hardcodedProducts";

export const Products = () => {
	const { isSmall } = useWindowResize();

	return (
		<Stack direction="column" m="3%" spacing={5}>
			<SearchBar />
			<CustomTable<Product>
				data={hardcodedProducts}
				columns={productColumns}
				handleDelete={() => {}}
			/>
		</Stack>
	);
};
