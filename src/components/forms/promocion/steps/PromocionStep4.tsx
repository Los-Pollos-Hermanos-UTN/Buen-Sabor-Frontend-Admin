import {
	Stack,
	TextField,
	Autocomplete,
	Chip,
	IconButton,
    Typography,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { getConstants } from "../../../../constants/constants";
import { getData } from "../../../../services/RequestExecutor";
import { ArticuloInsumo } from "../../../../types/Insumo";
import {
	ArticuloManufacturado,
	ArticuloManufacturadoDetalle,
} from "../../../../types/Manufacturado";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PromocionDetalle } from "../../../../types/Promocion";

export const PromocionStep4 = (props: any) => {
	const CONSTANTS = getConstants();
	const { values, errors, setFieldValue } = props;

	const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
	const [manufacturados, setManufacturados] = useState<ArticuloManufacturado[]>(
		[]
	);
	const [selectedArticulos, setSelectedArticulos] = useState<
		Array<ArticuloInsumo | ArticuloManufacturado>
	>([]);
	const [editingArticulo, setEditingArticulo] = useState<string | null>(null);
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
		const getManufacturados = async () => {
			try {
				const response = await getData<ArticuloManufacturado[]>(
					CONSTANTS.manufacturado.getUrl
				);
				setManufacturados(response);
			} catch (error) {
				console.error(error);
			}
		};
		getInsumos();
		getManufacturados();
	}, []);

	useEffect(() => {
		if (values.promocionDetalles && values.promocionDetalles.length > 0) {
			const articulosFromDetalles = values.promocionDetalles.map(
				(detalle: PromocionDetalle) => detalle.articulo
			);
			setSelectedArticulos(articulosFromDetalles);
		}
	}, [values.promocionDetalles]);

	useEffect(() => {
		if (editingArticulo !== null && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editingArticulo]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				if (editingArticulo) {
					handleSaveEdit(editingArticulo);
				}
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [editingArticulo]);

	const handleDelete = (denominacion: string) => {
		const updatedDetalles = values.promocionDetalles.filter(
			(detalle: PromocionDetalle) =>
				detalle.articulo.denominacion !== denominacion
		);
		setSelectedArticulos(
			selectedArticulos.filter(
				(articulo) => articulo.denominacion !== denominacion
			)
		);
		setFieldValue("promocionDetalles", updatedDetalles);
	};

	const handleAutocompleteChange = (_, newValue) => {
		setSelectedArticulos(newValue);

		const updatedDetalles = values.promocionDetalles.filter(
			(detalle: PromocionDetalle) =>
				newValue.some(
					(articulo) => articulo.denominacion === detalle.articulo.denominacion
				)
		);

		newValue.forEach((newArticulo: ArticuloInsumo | ArticuloManufacturado) => {
			if (
				!values.promocionDetalles.some(
					(detalle: PromocionDetalle) =>
						detalle.articulo.denominacion === newArticulo.denominacion
				)
			) {
				updatedDetalles.push({
					id: null,
					eliminado: false,
					cantidad: 1,
					articulo: newArticulo,
				});
			}
		});

		setFieldValue("promocionDetalles", updatedDetalles);
	};

	const handleEditClick = (denominacion: string, cantidad: number) => {
		setEditingArticulo(denominacion);
		setNewCantidad(cantidad);
	};

	const handleSaveEdit = (denominacion: string) => {
		setFieldValue(
			"promocionDetalles",
			values.promocionDetalles.map((detalle: PromocionDetalle) =>
				detalle.articulo.denominacion === denominacion
					? { ...detalle, cantidad: newCantidad }
					: detalle
			)
		);
		setEditingArticulo(null);
		setNewCantidad(0);
	};

	const preventBackspacePropagation = (event: {
		key: string;
		stopPropagation: () => void;
	}) => {
		if (event.key === "Backspace") {
			event.stopPropagation();
		} else if (event.key === "Enter") {
			if (editingArticulo) {
				handleSaveEdit(editingArticulo);
			}
		}
	};

	return (
		<Stack spacing={2}>
			<Typography variant="h6">¿Qué Productos Incluye?</Typography>
			<Autocomplete
				multiple
				id="articulo"
				options={[...insumos, ...manufacturados]}
				getOptionLabel={(option) => option.denominacion}
				disableClearable
				value={selectedArticulos}
				onChange={handleAutocompleteChange}
				renderTags={(_, getTagProps) => (
					<div style={{ maxHeight: "200px", overflow: "auto" }}>
						{values.promocionDetalles.map(
							(detalle: PromocionDetalle, index: number) => (
								<Chip
									label={
										<div style={{ display: "flex", alignItems: "center" }}>
											{detalle.articulo.denominacion} x{" "}
											{editingArticulo === detalle.articulo.denominacion ? (
												<input
													type="number"
													value={newCantidad}
													onChange={(e) =>
														setNewCantidad(Number(e.target.value))
													}
													onKeyDown={preventBackspacePropagation}
													onBlur={() =>
														handleSaveEdit(detalle.articulo.denominacion)
													}
													style={{ width: "60px", marginRight: "8px" }}
													ref={inputRef}
												/>
											) : (
												`${detalle.cantidad}`
											)}{" "}
											{detalle.articulo.unidadMedida.denominacion}
										</div>
									}
									{...getTagProps({ index })}
									deleteIcon={
										<>
											{editingArticulo !== detalle.articulo.denominacion && (
												<IconButton
													onClick={() =>
														handleEditClick(
															detalle.articulo.denominacion,
															detalle.cantidad
														)
													}
													size="small"
												>
													<EditIcon fontSize="inherit" />
												</IconButton>
											)}
											<IconButton
												onClick={() =>
													handleDelete(detalle.articulo.denominacion)
												}
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
						label="Artículos"
						placeholder="Seleccionar Artículo"
						error={Boolean(errors.promocionDetalles)}
						helperText={errors.promocionDetalles}
					/>
				)}
			/>
		</Stack>
	);
};
