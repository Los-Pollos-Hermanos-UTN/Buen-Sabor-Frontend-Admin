import { Category } from "../types/Category";

export const hardcodedCategories: Category[] = [
    {
        denominacion: "Electrónica",
        subCategorias: [
            {
                denominacion: "Smartphones",
                subCategorias: [
                    { denominacion: "Android" },
                    { denominacion: "iOS" },
                    { denominacion: "Otros" },
                ],
            },
            {
                denominacion: "Laptops",
                subCategorias: [
                    { denominacion: "Windows" },
                    { denominacion: "MacOS" },
                    { denominacion: "Chromebook" },
                ],
            },
            {
                denominacion: "Accesorios",
                subCategorias: [
                    { denominacion: "Auriculares" },
                    { denominacion: "Cables y cargadores" },
                    { denominacion: "Fundas y protectores" },
                ],
            },
        ],
    },
    {
        denominacion: "Hogar y Cocina",
        subCategorias: [
            {
                denominacion: "Electrodomésticos",
                subCategorias: [
                    { denominacion: "Neveras y congeladores" },
                    { denominacion: "Hornos y microondas" },
                    { denominacion: "Lavadoras y secadoras" },
                ],
            },
            {
                denominacion: "Utensilios de Cocina",
                subCategorias: [
                    { denominacion: "Ollas y sartenes" },
                    { denominacion: "Cuchillos y tablas" },
                    { denominacion: "Electrodomésticos pequeños" },
                ],
            },
        ],
    },
    {
        denominacion: "Moda",
        subCategorias: [
            {
                denominacion: "Ropa",
                subCategorias: [
                    { denominacion: "Hombres" },
                    { denominacion: "Mujeres" },
                    { denominacion: "Niños" },
                ],
            },
            {
                denominacion: "Calzado",
                subCategorias: [
                    { denominacion: "Zapatos" },
                    { denominacion: "Zapatillas deportivas" },
                    { denominacion: "Sandalias" },
                ],
            },
        ],
    },
];
