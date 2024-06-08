import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { BarChart } from "@mui/x-charts/BarChart";

export function MyBarChart() {
  const [series, setSeries] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [itemNb, setItemNb] = useState(5); // Estado para la cantidad de ítems

  const handleItemNbChange = (event, newValue) => {
    setItemNb(newValue);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/report/top-selling-products?limit=${itemNb}`) // Utilizar el número actual de ítems en la solicitud
      .then((response) => response.json())
      .then((data) => {
        const seriesData = [
          {
            label: "Cantidad vendida",
            data: data.map((item) => item.quantitySold),
            color: "#251C2F",
          },
        ];
        setSeries(seriesData);
        setProductNames(data.map((item) => item.productName));
      })
      .catch((error) => {
        console.error("There was an error fetching the top selling products!", error);
      });
  }, [itemNb]); // Asegurar que el efecto se ejecute cuando cambie itemNb

  return (
    <Box sx={{ width: "100%" }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: productNames }]}
        height={300}
        slotProps={{
          bar: {
            clipPath: `inset(0px round 10px 10px 0px 0px)`,
          },
        }}
        series={series}
      />
      <Typography id="input-item-number" gutterBottom>
        Number of items
      </Typography>
      <Slider
        value={itemNb}
        onChange={handleItemNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={10}
        aria-labelledby="input-item-number"
      />
    </Box>
  );
}
