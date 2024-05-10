import { Stack } from "@mui/material";
import { ProductPreviewCard } from "../../../cards/ProductPreviewCard";

export const ProductPreview = () => {
	return (
		<Stack ml="10%" direction="row" justifyContent="start">
			<ProductPreviewCard
				title={"Manso Producto"}
				description={"Esta es la descripción de un producto manufacturado"}
				price={7000}
				image={
                    "https://okdiario.com/img/2021/12/09/hamburguesas-caseras-rellenas-de-queso-cheddar-655x368.jpg"
				}
			/>
		</Stack>
	);
};
