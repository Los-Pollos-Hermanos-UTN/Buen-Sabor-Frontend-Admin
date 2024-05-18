import { useState, FC } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SearchBar } from "../components/shared/SearchBar";
import { Category } from "../types/Category";

interface ICategoriaButton {
	categoria: Category;
}

const CategoriaButton: FC<ICategoriaButton> = ({ categoria }) => {
	const [expanded, setExpanded] = useState<string | false>(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	return (
		<Accordion
			expanded={expanded === categoria.denominacion}
			onChange={handleChange(categoria.denominacion)}
			sx={{
				boxShadow: "none",
				"&:before": {
					display: "none",
				},
				"&$expanded": {
					margin: "auto",
				},
				borderRadius: "10px",
				border: "none",
			}}
		>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>{categoria.denominacion}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{categoria.subCategorias?.map((subCategoria) => (
					<CategoriaButton
						key={subCategoria.denominacion}
						categoria={subCategoria}
					/>
				))}
			</AccordionDetails>
		</Accordion>
	);
};

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
