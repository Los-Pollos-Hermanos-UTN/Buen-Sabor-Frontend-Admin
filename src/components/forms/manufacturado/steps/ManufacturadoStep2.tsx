import {
	Autocomplete,
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
import { AddButton } from "../../../buttons/AddButton";
import { FormModal } from "../../../modals/FormModal";
import {
	UnidadMedidaInitialValues,
	UnidadMedidaValidationSchemas,
	UnidadMedidaFormSteps,
} from "../../unidadMedida/UnidadMedidaFormData";

export const ManufacturadoStep2 = (props: any) => {
	const { values, errors, handleChange, setFieldValue } = props;

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
	const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);
	const [selectedInsumos, setSelectedInsumos] = useState<ArticuloInsumo[]>([]);

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
		const updatedDetalles = values.articuloManufacturadoDetalles.filter(
			(detalle: ArticuloManufacturadoDetalle) =>
				detalle.articuloInsumo.denominacion !== denominacion
		);
		setFieldValue("articuloManufacturadoDetalles", updatedDetalles);

		const updatedSelectedInsumos = selectedInsumos.filter(
			(insumo) => insumo.denominacion !== denominacion
		);
		setSelectedInsumos(updatedSelectedInsumos);
	};

	const handleAutocompleteChange = (_, newValue) => {
		setSelectedInsumos(newValue);

		const updatedDetalles = values.articuloManufacturadoDetalles.filter(
			(detalle: ArticuloManufacturadoDetalle) =>
				newValue.some(
					(insumo) => insumo.denominacion === detalle.articuloInsumo.denominacion
				)
		);

		newValue.forEach((newInsumo) => {
			if (!values.articuloManufacturadoDetalles.some(
				(detalle: ArticuloManufacturadoDetalle) =>
					detalle.articuloInsumo.denominacion === newInsumo.denominacion
			)) {
				updatedDetalles.push({
					id: null,
					eliminado: false,
					cantidad: 1,
					articuloInsumo: newInsumo,
				});
			}
		});

		setFieldValue("articuloManufacturadoDetalles", updatedDetalles);
	};

	return (
		<>
			<Stack spacing={2}>
				<Stack direction="row" spacing={3} alignItems="center">
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
								<MenuItem key={unidad.id} value={unidad as any}>
									{unidad.denominacion}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<AddButton handleClick={handleOpen} />
				</Stack>
				<Autocomplete
					multiple
					id="articuloInsumo"
					options={insumos}
					getOptionLabel={(option) => option.denominacion}
					disableClearable
					value={selectedInsumos}
					onChange={handleAutocompleteChange}
					renderTags={(_, getTagProps) => (
						<div style={{ maxHeight: "200px", overflow: "auto" }}>
							{values.articuloManufacturadoDetalles.map(
								(detalle: ArticuloManufacturadoDetalle, index: number) => (
									<Chip
										label={`${detalle.articuloInsumo.denominacion} x${detalle.cantidad} ${detalle.articuloInsumo.unidadMedida.denominacion}`}
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
			<FormModal
				title={"Agregar Unidad de Medida"}
				open={open}
				handleClose={handleClose}
				width={600}
				height={300}
				initialValues={UnidadMedidaInitialValues}
				validationSchemas={UnidadMedidaValidationSchemas}
				postUrl={CONSTANTS.unidadMedida.postURL}
				steps={UnidadMedidaFormSteps}
				substepDefault={false}
			/>
		</>
	);
};
