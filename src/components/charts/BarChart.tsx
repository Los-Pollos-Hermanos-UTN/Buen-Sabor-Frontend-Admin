// @ts-nocheck
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { BarChart } from "@mui/x-charts/BarChart";

export function MyBarChart() {
	const [series, setSeries] = useState([]);
	const [productNames, setProductNames] = useState([]);
	const [itemNb, setItemNb] = useState(5); // Estado para la cantidad de ítems

	const handleItemNbChange = (
		_: any,
		newValue: React.SetStateAction<number>
	) => {
		setItemNb(newValue);
	};

	useEffect(() => {
		const token = localStorage.getItem("Token");
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};

		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}

		fetch(`${import.meta.env.VITE_API_URL}/report/top-selling-products?limit=${itemNb}`, {
			method: "GET",
			headers: headers,
		})
			.then((response) => response.json())
			.then((data) => {
				const seriesData = [
					{
						label: "Cantidad vendida",
						data: data.map((item: { quantitySold: any }) => item.quantitySold),
						color: "#251C2F",
					},
				];
				setSeries(seriesData as any);
				setProductNames(
					data.map((item: { productName: any }) => item.productName)
				);
			})
			.catch((error) => {
				console.error(
					"There was an error fetching the top selling products!",
					error
				);
			});
	}, [itemNb]); // Asegurar que el efecto se ejecute cuando cambie itemNb

	return (
		<Box sx={{ width: "100%" }}>
			<BarChart
				xAxis={[{ scaleType: "band", data: productNames }]}
				height={300}
				slotProps={{
					bar: {
						clipPath: `inset(0px round 10px 10px 0px 0px)`,
					},
				}}
				series={series}
			/>
			<Typography id="input-item-number" gutterBottom>
				Número de items
			</Typography>
			<Slider
				value={itemNb}
				onChange={handleItemNbChange}
				valueLabelDisplay="auto"
				min={1}
				max={10}
				sx={{
					color: "#A9927D",
				}}
			/>
		</Box>
	);
}
