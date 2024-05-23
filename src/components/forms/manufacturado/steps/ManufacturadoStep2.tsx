import React, { useEffect, useRef, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { getData } from "../../../../services/RequestExecutor";
import { getConstants } from "../../../../constants/constants";
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
	const CONSTANTS = getConstants();
	const { values, errors, handleChange, setFieldValue } = props;

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
	const [unidadesMedida, setUnidadesMedida] = useState<UnidadMedida[]>([]);
	const [selectedInsumos, setSelectedInsumos] = useState<ArticuloInsumo[]>([]);
	const [editingInsumo, setEditingInsumo] = useState<string | null>(null);
	const [newCantidad, setNewCantidad] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement | null>(null);

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
	}, [open]);

	useEffect(() => {
		if (editingInsumo !== null && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editingInsumo]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				if (editingInsumo) {
					handleSaveEdit(editingInsumo);
				}
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [editingInsumo]);

	const handleDelete = (denominacion: string) => {
		const updatedDetalles = values.articuloManufacturadoDetalles.filter(
			(detalle: ArticuloManufacturadoDetalle) =>
				detalle.articuloInsumo.denominacion !== denominacion
		);
		setSelectedInsumos(
			selectedInsumos.filter(
				(insumo) => insumo.denominacion !== denominacion
			)
		);
		setFieldValue("articuloManufacturadoDetalles", updatedDetalles);
	};

	const handleAutocompleteChange = (_, newValue) => {
		setSelectedInsumos(newValue);

		const updatedDetalles = values.articuloManufacturadoDetalles.filter((detalle: ArticuloManufacturadoDetalle) =>
			newValue.some((insumo) => insumo.denominacion === detalle.articuloInsumo.denominacion)
		);

		newValue.forEach((newInsumo) => {
			if (!values.articuloManufacturadoDetalles.some(
				(detalle: ArticuloManufacturadoDetalle) => detalle.articuloInsumo.denominacion === newInsumo.denominacion
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

	const handleEditClick = (denominacion: string, cantidad: number) => {
		setEditingInsumo(denominacion);
		setNewCantidad(cantidad);
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.focus();
			}
		}, 0); // Ensures that the input is focused after the state is updated
	};

	const handleSaveEdit = (denominacion: string) => {
		setFieldValue(
			"articuloManufacturadoDetalles",
			values.articuloManufacturadoDetalles.map(
				(detalle: ArticuloManufacturadoDetalle) =>
					detalle.articuloInsumo.denominacion === denominacion
						? { ...detalle, cantidad: newCantidad }
						: detalle
			)
		);
		setEditingInsumo(null);
		setNewCantidad(0);
		if (inputRef.current) {
			inputRef.current.blur();
		}
	};

	const handleIconClick = (event: React.MouseEvent) => {
		event.currentTarget.blur();
	};

	const preventBackspacePropagation = (event) => {
		if (event.key === 'Backspace') {
			event.stopPropagation();
		} else if (event.key === 'Enter') {
			if (editingInsumo) {
				handleSaveEdit(editingInsumo);
			}
		}
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
										key={detalle.articuloInsumo.denominacion}
										label={
											<div style={{ display: "flex", alignItems: "center" }}>
												{detalle.articuloInsumo.denominacion} x{" "}
												{editingInsumo === detalle.articuloInsumo.denominacion ? (
													<input
														type="number"
														value={newCantidad}
														onChange={(e) => setNewCantidad(Number(e.target.value))}
														onKeyDown={preventBackspacePropagation}
														style={{ width: "60px", marginRight: "8px", MozAppearance: 'textfield', appearance: 'textfield' }}
														ref={inputRef}
													/>
												) : (
													`${detalle.cantidad}`
												)}
												{" "}{detalle.articuloInsumo.unidadMedida.denominacion}
											</div>
										}
										{...getTagProps({ index })}
										deleteIcon={
											<>
												{editingInsumo === detalle.articuloInsumo.denominacion ? (
													<IconButton
														onClick={(event) => {
															handleSaveEdit(detalle.articuloInsumo.denominacion);
															handleIconClick(event);
														}}
														size="small"
														onMouseLeave={() => setEditingInsumo(null)}
													>
														<CheckIcon fontSize="inherit" />
													</IconButton>
												) : (
													<IconButton
														onClick={(event) => {
															handleEditClick(detalle.articuloInsumo.denominacion, detalle.cantidad);
															handleIconClick(event);
														}}
														size="small"
													>
														<EditIcon fontSize="inherit" />
													</IconButton>
												)}
												<IconButton
													onClick={(event) => {
														handleDelete(detalle.articuloInsumo.denominacion);
														handleIconClick(event);
													}}
													size="small"
												>
													<DeleteIcon fontSize="inherit" />
												</IconButton>
											</>
										}
										style={{ marginRight: "4px" }}
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
