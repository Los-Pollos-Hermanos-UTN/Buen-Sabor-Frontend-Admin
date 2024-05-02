import { Box, Button, Stack } from "@mui/material";
import { SearchBar } from "../components/shared/SearchBar";
import { CustomTable } from "../components/table/CustomTable";
import { Promotion, promotionColumns } from "../types/Promotion";
import { hardcodedPromotions } from "../data/hardcodedPromotions";
import { ListActiveButton } from "../components/buttons/ListActiveButton";

export const Promotions = () => {
	return (
		<Stack direction="column" m="3%" spacing={5}>
			<SearchBar extraButtons={[<ListActiveButton />]} />
			<CustomTable<Promotion>
				data={hardcodedPromotions}
				columns={promotionColumns}
				handleDelete={() => {}}
			/>
		</Stack>
	);
};
