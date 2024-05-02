export interface Category {
    denominacion: string;
    subCategorias?: Category[];
}