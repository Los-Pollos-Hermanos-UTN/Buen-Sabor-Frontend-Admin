import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Categoria } from "../../types/Categoria";
import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
} from "@mui/material";
import { FC, useState } from "react";

interface CategoriaButtonProps {
	categoria: Categoria;
}

export const CategoriaButton: FC<CategoriaButtonProps> = ({ categoria }) => {
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
