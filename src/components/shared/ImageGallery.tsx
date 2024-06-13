// @ts-nocheck
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@mui/material";

interface CustomImageCarouselProps {
	images: string[];
	alt?: string;
	width?: string | number;
	height?: string | number;
}

export const CustomImageCarousel: React.FC<CustomImageCarouselProps> = ({
	images,
	alt,
	width,
	height,
}) => {
	if (images.length === 0) {
		return <Box sx={{ color: "red" }}>No hay imágenes disponibles</Box>;
	}

	return (
		<Box
			sx={{
				width: width || "50%",
				height: height || "auto",
				position: "relative",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#f0f0f0",
			}}
		>
			<Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
				{images.map((src, index) => (
					<div key={index}>
						<img
							src={src.url}
							alt={`${alt} - Imagen ${index + 1}`}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>
				))}
			</Carousel>
		</Box>
	);
};
