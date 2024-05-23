import React, { useState, useRef } from "react";
import { Stack, Button, IconButton, Typography } from "@mui/material";
import { useField } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import DeleteIcon from '@mui/icons-material/Delete';

export const ImageStep = (props: any) => {
    const { values, setFieldValue } = props;
    const [field, meta, helpers] = useField("imagenes");
    const [currentIndex, setCurrentIndex] = useState(0);
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        if (values.imagenes.length + files.length > 4) {
            return toast.warning("Solo puedes subir un máximo de 4 imágenes.");
        }

        const newImages: (File | { url: string })[] = [];
        for (const file of files) {
            const processedFile = await processImage(file);
            newImages.push(processedFile);
        }

        const updatedImages = [...values.imagenes, ...newImages];
        setFieldValue("imagenes", updatedImages);
    };

    const processImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const size = Math.max(img.width, img.height);
                canvas.width = size;
                canvas.height = size;

                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = 'white'; // Background color for the padding
                    ctx.fillRect(0, 0, size, size);
                    ctx.drawImage(img, (size - img.width) / 2, (size - img.height) / 2);
                }

                canvas.toBlob((blob) => {
                    if (blob) {
                        const processedFile = new File([blob], file.name, { type: 'image/png' });
                        resolve(processedFile);
                    }
                }, 'image/png');
            };
        });
    };

    const handleClick = () => {
        hiddenFileInput.current?.click();
    };

    const handleDeleteImage = () => {
        if (values.imagenes.length === 0) return;

        const newImages = values.imagenes.filter((_, index) => index !== currentIndex);
        setFieldValue("imagenes", newImages);
        if (currentIndex >= newImages.length) {
            setCurrentIndex(newImages.length - 1);
        }
    };

    const handleCarouselChange = (index: number) => {
        setCurrentIndex(index);
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
                {values.imagenes.length > 0 ? `${values.imagenes.length} imagen(es) seleccionada(s)` : "Elige imágenes"}
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
                <div style={{ width: "80%", height: "90%", position: 'relative' }}>
                    <Carousel
                        showThumbs={false}
                        showArrows={false}
                        showIndicators={true}
                        selectedItem={currentIndex}
                        autoPlay={true}
                        infiniteLoop={true}
                        stopOnHover={false}
                        onChange={handleCarouselChange}
                    >
                        {values.imagenes.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={getImageSrc(image)}
                                    alt={`Imagen ${index + 1}`}
                                    style={{ width: "50%", height: "50%" }}
                                />
                            </div>
                        ))}
                    </Carousel>
                    <IconButton
                        style={{
                            position: 'absolute',
                            top: "87%",
                            right: "13%",
                            backgroundColor: 'rgba(255, 255, 255, 0.0)'
                        }}
                        onClick={handleDeleteImage}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Stack>
    );
};
