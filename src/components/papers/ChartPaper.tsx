import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";

const CustomPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: "white",
	borderRadius: "10px",
	padding: theme.spacing(2),
	...theme.typography.body2,
	textAlign: "center",
}));

interface ChartPaperProps {
	title: string;
	chart: ReactElement;
	width: number | string;
	height: number | string;
}

export const ChartPaper = ({
	title,
	chart,
	width,
	height,
}: ChartPaperProps) => {
	return (
		<CustomPaper
			square={false}
			sx={{
				width: width,
				height: height,
			}}
		>
			<Stack>
				<Typography variant="h6" ml="5%" mt="3%" textAlign="start">
					{title}
				</Typography>
				{chart}
			</Stack>
		</CustomPaper>
	);
};
