import { Box, Stack, Typography } from "@mui/material";
import { SearchBar } from "../components/shared/SearchBar";
import { useWindowResize } from "../hooks/useWindowResize";
import { EditButton } from "../components/buttons/EditButton";
import { BranchCard } from "../components/cards/BranchCard";

export const Company = () => {
	const { isSmall } = useWindowResize();

	const branches = ["", "", "", ""];
	return (
		<Stack direction="column" m="3%" spacing={3}>
			<SearchBar />
			<Stack direction="row" spacing={3}>
				<Box>
					<Typography variant="h4" fontSize="35px" color="#49111C">
						Pollos Hermanos
					</Typography>
					<Typography variant="h6" fontSize="30px" color="#5E503F">
						Sucursales
					</Typography>
				</Box>
				<EditButton />
			</Stack>
			<Stack direction="row" flexWrap="wrap" justifyContent='center'>
				{branches.map(() => (
					<Box m='1%'>
						<BranchCard />
					</Box>
				))}
			</Stack>
		</Stack>
	);
};
