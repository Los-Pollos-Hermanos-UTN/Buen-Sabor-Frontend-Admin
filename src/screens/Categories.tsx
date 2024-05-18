import { Stack } from "@mui/material";
import { SearchBar } from "../components/shared/SearchBar";
import { Category } from "../types/Category";
import { CategoriaButton } from "../components/buttons/CategoriaButton";

export const Categories = () => {
	const categorias: Category[] = [];

	return (
		<Stack direction="column" m="3%" spacing={5}>
			<SearchBar />
			{categorias.map((categoria) => (
				<CategoriaButton key={categoria.denominacion} categoria={categoria} />
			))}
		</Stack>
	);
};
