import React, { useRef } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { NotificationContainer } from "../../shared/NotificationContainer";

export const ImageStep = (props: any) => {
	const { values, setFieldValue, setTouched } = useFormikContext();
	const [field, meta] = useField("imagenes");
	const hiddenFileInput = useRef<HTMLInputElement | null>(null);

	const handleImageChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files ? Array.from(event.target.files) : [];
		if (values.imagenes.length + files.length > 3) {
			toast.warning("Solo puedes subir un máximo de 3 imágenes.");
			return;
		}

		const newImages: (File | { url: string })[] = [];
		for (const file of files) {
			const processedFile = await processImage(file);
			newImages.push(processedFile);
		}

		const updatedImages = [...values.imagenes, ...newImages];
		setFieldValue("imagenes", updatedImages);

		// Quitar el error de validación al agregar imágenes
		setTouched({ imagenes: false });

		// Reset the input value to allow re-uploading the same file
		if (hiddenFileInput.current) {
			hiddenFileInput.current.value = "";
		}
	};

	const processImage = (file: File): Promise<File> => {
		return new Promise((resolve) => {
			const img = new Image();
			img.src = URL.createObjectURL(file);

			img.onload = () => {
				const canvas = document.createElement("canvas");
				const size = Math.max(img.width, img.height);
				canvas.width = size;
				canvas.height = size;

				const ctx = canvas.getContext("2d");
				if (ctx) {
					ctx.fillStyle = "white"; // Background color for the padding
					ctx.fillRect(0, 0, size, size);
					ctx.drawImage(img, (size - img.width) / 2, (size - img.height) / 2);
				}

				canvas.toBlob((blob) => {
					if (blob) {
						const processedFile = new File([blob], file.name, {
							type: "image/png",
						});
						resolve(processedFile);
					}
				}, "image/png");
			};
		});
	};

	const handleClick = () => {
		hiddenFileInput.current?.click();
	};

	const handleRemoveImage = (index: number) => {
		const newImages = values.imagenes.filter((_, i) => i !== index);
		setFieldValue("imagenes", newImages);
		// Marcar el campo como "touched" si no hay imágenes
		if (newImages.length === 0) {
			setTouched({ imagenes: true });
		}
	};

	const getImageSrc = (image: any) => {
		if (typeof image === "string") {
			return image;
		} else if (image.url) {
			return image.url;
		} else {
			return URL.createObjectURL(image);
		}
	};

	return (
		<Stack spacing={2} alignItems="center">
			<Button
				onClick={handleClick}
				variant="contained"
				type="button"
				sx={{
					width: "50%",
					textTransform: "none",
					backgroundColor: "#49111C",
					"&:hover": {
						backgroundColor: "#49111C",
					},
				}}
			>
				{values.imagenes.length > 0
					? `${values.imagenes.length} imagen(es) seleccionada(s)`
					: "Elige imágenes"}
			</Button>
			<input
				type="file"
				ref={hiddenFileInput}
				style={{ display: "none" }}
				multiple
				onChange={handleImageChange}
			/>
			{meta.touched && meta.error && (
				<Typography color="error">{meta.error}</Typography>
			)}
			{values.imagenes.length > 0 && (
				<Box display="flex" flexWrap="wrap" justifyContent="center">
					{values.imagenes.map((image, index) => (
						<Box key={index} position="relative" m={1}>
							<img
								src={getImageSrc(image)}
								alt={`Imagen ${index + 1}`}
								width={150}
								height={150}
								style={{ objectFit: "cover" }}
							/>
							<IconButton
								style={{
									position: "absolute",
									top: 0,
									right: 0,
									backgroundColor: "rgba(255, 255, 255, 0.0)",
								}}
								onClick={() => handleRemoveImage(index)}
							>
								<DeleteIcon />
							</IconButton>
						</Box>
					))}
				</Box>
			)}
			<NotificationContainer />
		</Stack>
	);
};
