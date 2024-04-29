import { PieChart } from "@mui/x-charts/PieChart";

export function MyPieChart() {
	return (
		<PieChart
			height={300}
			series={[
				{
					data: [
						{ value: 5, label: "Tragos", color: "#251C2F" },
						{ value: 10, label: "Postre", color: "#A9927D" },
						{ value: 15, label: "Bebida", color: "#5E503F" },
						{ value: 35, label: "Comida", color: "#49111C" },
					],
					innerRadius: 30,
					outerRadius: 100,
					paddingAngle: 5,
					cornerRadius: 5,
					startAngle: -90,
					endAngle: 180,
					cx: 150,
					cy: 150,
				},
			]}
		/>
	);
}
