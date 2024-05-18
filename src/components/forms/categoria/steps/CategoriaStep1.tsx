import { Stack, TextField } from "@mui/material";

export const CategoriaStep1 = (props: any) => {
    const { values, errors, handleChange, handleBlur } = props;

    return (
        <Stack spacing={2}>
            <TextField
                fullWidth
                id="denominacion"
                name="denominacion"
                label="Denominación de la Categoría"
                value={values.denominacion}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.denominacion)}
                helperText={errors.denominacion}
                variant="outlined"
            />
        </Stack>
    );
};
