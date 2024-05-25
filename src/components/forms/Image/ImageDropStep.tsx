import { useState } from "react";
import { Stack, Button, Box } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";

export const ImageStep = () => {
	const [field, , helpers] = useField("imagenes");
	const { setFieldValue } = useFormikContext();
	const [previews, setPreviews] = useState<string[]>(field.value || []);

	const handleDrop = (acceptedFiles: File[]) => {
		const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
		setPreviews([...previews, ...newPreviews]);
		setFieldValue("imagenes", [...field.value, ...acceptedFiles]);
	};

	const handleRemoveImage = (index: number) => {
		const newPreviews = previews.filter((_, i) => i !== index);
		setPreviews(newPreviews);
		setFieldValue(
			"imagenes",
			field.value.filter((_: any, i: number) => i !== index)
		);
	};

	return (
		<Stack spacing={2}>
			<ImageDropzone onDrop={handleDrop} />
			<Box display="flex" flexWrap="wrap">
				{previews.map((src, index) => (
					<Box key={index} position="relative" m={1}>
						<img src={src} alt={`imagen-${index}`} width={150} height={150} />
						<Button
							size="small"
							onClick={() => handleRemoveImage(index)}
							style={{
								borderRadius: "8px",
								position: "absolute",
								top: 0,
								right: 0,
								color: "white",
							}}
						>
							<DeleteIcon />
						</Button>
					</Box>
				))}
			</Box>
		</Stack>
	);
};

export const ImageDropzone = ({
	onDrop,
}: {
	onDrop: (acceptedFiles: File[]) => void;
}) => {
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: "image/*",
		maxFiles: 10,
	});

	return (
		<Box
			{...getRootProps()}
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			p={2}
			border="2px dashed #ccc"
			borderRadius={4}
		>
			<input {...getInputProps()} />
			<Button
				sx={{
					textTransform: "none",
					color: "grey",
				}}
			>
				Arrastra y suelta imágenes aquí o haz clic para seleccionar
			</Button>
		</Box>
	);
};
