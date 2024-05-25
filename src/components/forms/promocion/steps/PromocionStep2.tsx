import React, { useEffect, useState, useRef } from "react";
import {
	Autocomplete,
	Chip,
	Stack,
	TextField,
	IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getData } from "../../../../services/RequestExecutor";
import { getConstants } from "../../../../constants/constants";
import { ArticuloManufacturado } from "../../../../types/Manufacturado";
import { ArticuloInsumo } from "../../../../types/Insumo";
import { PromocionDetalle } from "../../../../types/Promocion";
import { AddButton } from "../../../buttons/AddButton";

export const PromocionStep2 = (props: any) => {
	const CONSTANTS = getConstants();
	const { values, errors, handleChange, setFieldValue } = props;

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [articulosManufacturados, setArticulosManufacturados] = useState<
		ArticuloManufacturado[]
	>([]);
	const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>(
		[]
	);
	const [selectedArticulos, setSelectedArticulos] = useState<
		ArticuloInsumo | ArticuloManufacturado[]
	>([]);
	const [editingArticulo, setEditingArticulo] = useState<string | null>(null);
	const [newCantidad, setNewCantidad] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		const fetchArticulos = async () => {
			try {
				const insumos = await getData<ArticuloInsumo[]>(
					CONSTANTS.insumo.getUrl
				);
				const manufacturados = await getData<ArticuloManufacturado[]>(
					CONSTANTS.manufacturado.getUrl
				);
				setArticulosInsumos(insumos.filter((insumo) => !insumo.esParaElaborar));
				setArticulosManufacturados(manufacturados);
			} catch (error) {
				console.error(error);
			}
		};
		fetchArticulos();
	}, []);

	useEffect(() => {
		if (values.promocionDetalles && values.promocionDetalles.length > 0) {
			const articulosFromDetalles = values.promocionDetalles.map(
				(detalle: PromocionDetalle) => detalle.articulo
			);
			setSelectedArticulos(articulosFromDetalles);
		}
	}, [values.promocionDetalles]);

	const handleAddDetalle = () => {
		if (editingArticulo && newCantidad > 0) {
			const articulo = [...articulosInsumos, ...articulosManufacturados].find(
				(art) => art.denominacion === editingArticulo
			);

			if (articulo) {
				const newDetalle: PromocionDetalle = {
					eliminado: false,
					id: null,
					articulo,
					cantidad: newCantidad,
				};
				setFieldValue("promocionDetalles", [
					...values.promocionDetalles,
					newDetalle,
				]);
				setEditingArticulo(null);
				setNewCantidad(0);
				handleClose();
			}
		}
	};

	const handleEditDetalle = (index: number) => {
		const detalle = values.promocionDetalles[index];
		setEditingArticulo(detalle.articulo.denominacion);
		setNewCantidad(detalle.cantidad);
		setFieldValue(
			"promocionDetalles",
			values.promocionDetalles.filter((_: any, i: number) => i !== index)
		);
		handleOpen();
	};

	const handleRemoveDetalle = (index: number) => {
		setFieldValue(
			"promocionDetalles",
			values.promocionDetalles.filter((_: any, i: number) => i !== index)
		);
	};

	return (
		<Stack spacing={2}>
			<Stack direction="row" alignItems="center" spacing={1}>
				<Autocomplete
					fullWidth
					options={[...articulosInsumos, ...articulosManufacturados]}
					getOptionLabel={(option) => option.denominacion}
					value={
						editingArticulo
							? [...articulosInsumos, ...articulosManufacturados].find(
									(art) => art.denominacion === editingArticulo
							  ) || null
							: null
					}
					onChange={(event, value) =>
						setEditingArticulo(value ? value.denominacion : null)
					}
					renderInput={(params) => <TextField {...params} label="Artículo" />}
				/>
				<TextField
					id="cantidad"
					label="Cantidad"
					type="number"
					value={newCantidad}
					onChange={(event) => setNewCantidad(parseFloat(event.target.value))}
					inputRef={inputRef}
					onFocus={() => inputRef.current?.select()}
				/>
			</Stack>

			{values.promocionDetalles.map(
				(detalle: PromocionDetalle, index: number) => (
					<Stack
						key={index}
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						spacing={1}
					>
						<Chip
							label={`${detalle.articulo.denominacion} - Cantidad: ${detalle.cantidad}`}
						/>
						<Stack direction="row" spacing={1}>
							<IconButton onClick={() => handleEditDetalle(index)}>
								<EditIcon />
							</IconButton>
							<IconButton onClick={() => handleRemoveDetalle(index)}>
								<DeleteIcon />
							</IconButton>
						</Stack>
					</Stack>
				)
			)}
		</Stack>
	);
};
