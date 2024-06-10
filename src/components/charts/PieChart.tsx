import * as React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

export function MyPieChart() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    fetch('http://localhost:8080/report/orders-by-category', { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const pieData = data.map(item => ({
          value: item.orderCount,
          id: item.categoryName,
          label: item.categoryName,
          color: getRandomColor(),
        }));
        setData(pieData);
      })
      .catch(error => {
        console.error("There was an error fetching the orders by category!", error);
      });
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
            endAngle: 270,  // Adjusted endAngle to complete the pie chart
            cx: 150,
            cy: 150,
            nameKey: 'label',
            dataKey: 'value',
            fillKey: 'color',
          },
        ]}
      />
    </Box>
  );
}
