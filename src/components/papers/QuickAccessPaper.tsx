import { Box, Button, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { QuickAccessWhiteButton } from "../buttons/QuickAccessWhiteButton";

const CustomPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: "rgba(10, 9, 8, 0.5)",
	borderRadius: "10px",
	width: 270,
	height: 150,
	padding: theme.spacing(2),
	...theme.typography.body2,
	textAlign: "center",
}));

export const QuickAccessPaper = ({ title }: { title: string }) => {
	return (
		<CustomPaper square={false}>
			<Stack>
				<Typography
					variant="h6"
					ml="5%"
					mt="3%"
					color="white"
					textAlign="start"
				>
					{title}
				</Typography>
				<Stack flexDirection='column' mt="2%">
					<QuickAccessWhiteButton icon={<AddIcon />} text="Agregar"/>
					<QuickAccessWhiteButton icon={<ChecklistIcon />} text="Listar"/>
				</Stack>
			</Stack>
		</CustomPaper>
	);
};
