import {
	Autocomplete,
	Button,
	Chip,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { getData } from "../../../../services/RequestExecutor";
import { CONSTANTS } from "../../../../constants/constants";
import { ArticuloManufacturadoDetalle } from "../../../../types/Manufacturado";
import { ArticuloInsumo } from "../../../../types/Insumo";
import { UnidadMedida } from "../../../../types/UnidadMedida";

export const ManufacturadoStep2 = (props: any) => {
	const { values, errors, handleChange, setFieldValue } = props;
	const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
	const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);

	useEffect(() => {
		const getInsumos = async () => {
			try {
				const response = await getData<ArticuloInsumo[]>(
					CONSTANTS.insumo.getUrl
				);
				setInsumos(response);
			} catch (error) {
				console.error(error);
			}
		};

		const getUnidadesMedida = async () => {
			try {
				const response = await getData<UnidadMedida[]>(
					CONSTANTS.unidadMedida.getUrl
				);
				setUnidadesMedida(response);
			} catch (error) {
				console.error(error);
			}
		};
		getInsumos();
		getUnidadesMedida();
	}, []);

	const handleIncrement = (denominacion: string) => {
		setFieldValue(
			"articuloManufacturadoDetalles",
			values.articuloManufacturadoDetalles.map(
				(detalle: ArticuloManufacturadoDetalle) =>
					detalle.articuloInsumo.denominacion === denominacion
						? { ...detalle, cantidad: detalle.cantidad + 1 }
						: detalle
			)
		);
	};

	const handleDecrement = (denominacion: string) => {
		setFieldValue(
			"articuloManufacturadoDetalles",
			values.articuloManufacturadoDetalles.map(
				(detalle: ArticuloManufacturadoDetalle) =>
					detalle.articuloInsumo.denominacion === denominacion &&
					detalle.cantidad > 0
						? { ...detalle, cantidad: detalle.cantidad - 1 }
						: detalle
			)
		);
	};

	const handleDelete = (denominacion: string) => {
		setFieldValue(
			"articuloManufacturadoDetalles",
			values.articuloManufacturadoDetalles.filter(
				(detalle: ArticuloManufacturadoDetalle) =>
					detalle.articuloInsumo.denominacion !== denominacion
			)
		);
	};

	return (
		<Stack spacing={2}>
			<FormControl fullWidth>
				<InputLabel id="unidad-medida-label">Unidad de Medida</InputLabel>
				<Select
					labelId="unidad-medida-label"
					id="unidad-medida-select"
					value={values.unidadMedida}
					label="Unidad de Medida"
					onChange={handleChange("unidadMedida")}
				>
					{unidadesMedida.map((unidad) => (
						<MenuItem key={unidad.id} value={unidad}>
							{unidad.denominacion}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Autocomplete
				multiple
				id="articuloInsumo"
				options={insumos}
				getOptionLabel={(option) => option.denominacion}
				onChange={(_, newValue) => {
					const newInsumo = newValue[newValue.length - 1];
					if (newInsumo) {
						setFieldValue("articuloManufacturadoDetalles", [
							...values.articuloManufacturadoDetalles,
							{
								id: null,
								eliminado: false,
								cantidad: 1,
								articuloInsumo: newInsumo,
							},
						]);
					}
				}}
				renderTags={(_, getTagProps) => (
					<div style={{ maxHeight: "200px", overflow: "auto" }}>
						{values.articuloManufacturadoDetalles.map(
							(detalle: ArticuloManufacturadoDetalle, index: number) => (
								<Chip
									label={`${detalle.articuloInsumo.denominacion} x${detalle.cantidad}`}
									{...getTagProps({ index })}
									deleteIcon={
										<>
											<IconButton
												onClick={() =>
													handleIncrement(detalle.articuloInsumo.denominacion)
												}
												size="small"
											>
												<AddIcon fontSize="inherit" />
											</IconButton>
											<IconButton
												onClick={() =>
													handleDecrement(detalle.articuloInsumo.denominacion)
												}
												size="small"
											>
												<RemoveIcon fontSize="inherit" />
											</IconButton>
											<IconButton
												onClick={() =>
													handleDelete(detalle.articuloInsumo.denominacion)
												}
												size="small"
											>
												<DeleteIcon fontSize="inherit" />
											</IconButton>
										</>
									}
								/>
							)
						)}
					</div>
				)}
				style={{ width: 500 }}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Insumos"
						placeholder="Seleccionar Insumo"
						error={Boolean(errors.articuloManufacturadoDetalles)}
						helperText={errors.articuloManufacturadoDetalles}
					/>
				)}
			/>
		</Stack>
	);
};
