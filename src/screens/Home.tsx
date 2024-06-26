import { Stack, Typography } from "@mui/material";
import { QuickAccessPaper } from "../components/papers/QuickAccessPaper";
import { useWindowResize } from "../hooks/useWindowResize";
import { ChartPaper } from "../components/papers/ChartPaper";
import { MyBarChart } from "../components/charts/BarChart";
import { MyPieChart } from "../components/charts/PieChart";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const quickAccess = [
	{
		title: "Articulos",
		route: "/manufacturados",
	},
	{
		title: "Sucursales",
		route: "/empresa",
	},
];

export const Home = () => {
	const { isSmall } = useWindowResize();
	const userRole = useSelector((state: RootState) => state.auth.userRole);

	return (
		<Stack direction="column" m="3%" spacing={5}>
			{isSmall || userRole !== "admin" ? (
				<Typography variant="h4">
					Estadísticas
				</Typography>
			) : (
				<>
					<Stack direction="row" height="30%" width="100%" spacing={2}>
						{quickAccess.map((access) => (
							<QuickAccessPaper
								key={access.title}
								title={access.title}
								navigateTo={access.route}
							/>
						))}
					</Stack>
				</>
			)}

			<Stack height="70%" direction={isSmall ? "column" : "row"} spacing={5}>
				<ChartPaper
					title={"Ranking de Productos"}
					chart={<MyBarChart />}
					width={isSmall ? "100%" : "55%"}
					height={isSmall ? "100%" : "100%"}
				></ChartPaper>
				<ChartPaper
					title={"Ventas por Categoria"}
					chart={<MyPieChart />}
					width={isSmall ? "100%" : "45%"}
					height={isSmall ? "100%" : "100%"}
				></ChartPaper>
			</Stack>
		</Stack>
	);
};
