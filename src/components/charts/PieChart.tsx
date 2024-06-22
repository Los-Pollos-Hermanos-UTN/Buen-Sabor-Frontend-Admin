import * as React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function MyPieChart() {
	const [data, setData] = React.useState([]);
	const empresa = useSelector(
        (state: RootState) => state.empresa.selectedEmpresa
    );

	React.useEffect(() => {
		const token = localStorage.getItem("Token");

		if (!token) {
			console.error("No token found in localStorage");
			return;
		}

		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};

		fetch(`${import.meta.env.VITE_API_URL}/report/empresa/${empresa.id}/orders-by-category`, { headers })
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				const pieData = data.map(
					(item: { orderCount: any; categoryName: any }) => ({
						value: item.orderCount,
						id: item.categoryName,
						label: item.categoryName,
						color: getNextColor(),
					})
				);
				setData(pieData);
			})
			.catch((error) => {
				console.error(
					"There was an error fetching the orders by category!",
					error
				);
			});
	}, []);

	const getNextColor = (() => {
		const colors = ["#49111C", "#A9927D", "#251C2F", "#5E503F", "#A9927D"];
		let index = 0;

		return () => {
			const color = colors[index];
			index = (index + 1) % colors.length;
			return color;
		};
	})();

	return (
		<Box sx={{ width: "100%", height: "300px" }}>
			<PieChart
				height={300}
				series={[
					{
						data: data,
						innerRadius: 30,
						outerRadius: 100,
						paddingAngle: 5,
						cornerRadius: 5,
						startAngle: -90,
						endAngle: 270,
						cx: 150,
						cy: 150,
					},
				]}
			/>
		</Box>
	);
}
