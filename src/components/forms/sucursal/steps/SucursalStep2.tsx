import { MenuItem, Select, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CONSTANTS } from "../../../../constants/constants";
import { getData } from "../../../../services/RequestExecutor";
import { Pais } from "../../../../types/Pais";
import { Provincia } from "../../../../types/Provincia";
import { Localidad } from "../../../../types/Localidad";

// Datos de ejemplo
const examplePaises: Pais[] = [
	{ id: "1", nombre: "Argentina" },
	{ id: "2", nombre: "Brasil" },
	{ id: "3", nombre: "Chile" },
];

const exampleProvincias: Provincia[] = [
	{ id: "1", nombre: "Buenos Aires", pais: { id: "1", nombre: "Argentina" } },
	{ id: "2", nombre: "Córdoba", pais: { id: "1", nombre: "Argentina" } },
	{ id: "3", nombre: "Mendoza", pais: { id: "1", nombre: "Argentina" } },
	{ id: "4", nombre: "São Paulo", pais: { id: "2", nombre: "Brasil" } },
	{ id: "5", nombre: "Río de Janeiro", pais: { id: "2", nombre: "Brasil" } },
	{ id: "6", nombre: "Valparaíso", pais: { id: "3", nombre: "Chile" } },
];

const exampleLocalidades: Localidad[] = [
	{
		id: "1",
		nombre: "La Plata",
		provincia: {
			id: "1",
			nombre: "Buenos Aires",
			pais: { id: "1", nombre: "Argentina" },
		},
	},
	{
		id: "2",
		nombre: "Mar del Plata",
		provincia: {
			id: "1",
			nombre: "Buenos Aires",
			pais: { id: "1", nombre: "Argentina" },
		},
	},
	{
		id: "3",
		nombre: "Córdoba",
		provincia: {
			id: "2",
			nombre: "Córdoba",
			pais: { id: "1", nombre: "Argentina" },
		},
	},
	{
		id: "4",
		nombre: "Mendoza",
		provincia: {
			id: "3",
			nombre: "Mendoza",
			pais: { id: "1", nombre: "Argentina" },
		},
	},
	{
		id: "5",
		nombre: "São Paulo",
		provincia: {
			id: "4",
			nombre: "São Paulo",
			pais: { id: "2", nombre: "Brasil" },
		},
	},
	{
		id: "6",
		nombre: "Río de Janeiro",
		provincia: {
			id: "5",
			nombre: "Río de Janeiro",
			pais: { id: "2", nombre: "Brasil" },
		},
	},
	{
		id: "7",
		nombre: "Valparaíso",
		provincia: {
			id: "6",
			nombre: "Valparaíso",
			pais: { id: "3", nombre: "Chile" },
		},
	},
];

export const SucursalStep2 = (props: any) => {
	const { values, errors, handleChange, handleBlur } = props;

	const [paises, setPaises] = useState<Pais[]>([]);
	const [provincias, setProvincias] = useState<Provincia[]>([]);
	const [localidades, setLocalidades] = useState<Localidad[]>([]);

	const [selectedPais, setSelectedPais] = useState<string>("");
	const [selectedProvincia, setSelectedProvincia] = useState<string>("");

	const [filteredProvincias, setFilteredProvincias] = useState<Provincia[]>([]);
	const [filteredLocalidades, setFilteredLocalidades] = useState<Localidad[]>(
		[]
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const [paisesData, provinciasData, localidadesData] = await Promise.all(
				// 	[
				// 		getData<Pais[]>(CONSTANTS.paises.getUrl),
				// 		getData<Provincia[]>(CONSTANTS.provincias.getUrl),
				// 		getData<Localidad[]>(CONSTANTS.localidades.getUrl),
				// 	]
				// );
				// setPaises(paisesData);
				// setProvincias(provinciasData);
				// setLocalidades(localidadesData);

				// Usar datos de ejemplo en lugar de fetch
				setPaises(examplePaises);
				setProvincias(exampleProvincias);
				setLocalidades(exampleLocalidades);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (selectedPais) {
			setFilteredProvincias(
				provincias.filter((provincia) => provincia.pais.id === selectedPais)
			);
		} else {
			setFilteredProvincias([]);
		}
		setSelectedProvincia(""); // reset provincia when pais changes
	}, [selectedPais, provincias]);

	useEffect(() => {
		if (selectedProvincia) {
			setFilteredLocalidades(
				localidades.filter(
					(localidad) => localidad.provincia.id === selectedProvincia
				)
			);
		} else {
			setFilteredLocalidades([]);
		}
	}, [selectedProvincia, localidades]);

	const handlePaisChange = (event: any) => {
		setSelectedPais(event.target.value);
		handleChange(event);
	};

	const handleProvinciaChange = (event: any) => {
		setSelectedProvincia(event.target.value);
		handleChange(event);
	};

	const domicilio = values.domicilio || {};
	const localidad = domicilio.localidad || {};
	const provincia = localidad.provincia || {};

	return (
		<Stack spacing={2}>
			<Stack direction="row" spacing={1} justifyContent="space-between">
				<TextField
					label="Calle"
					name="domicilio.calle"
					value={domicilio.calle || ""}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.calle)}
					helperText={errors.domicilio?.calle}
				/>
				<TextField
					label="Código Postal"
					name="domicilio.cp"
					value={domicilio.cp || ""}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.cp)}
					helperText={errors.domicilio?.cp}
				/>
				<TextField
					label="Número de Calle"
					name="domicilio.numero"
					value={domicilio.numero || ""}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.numero)}
					helperText={errors.domicilio?.numero}
				/>
			</Stack>
			<Stack direction="row" spacing={1}>
				<Select
					fullWidth
					name="domicilio.localidad.provincia.pais.nombre"
					value={selectedPais}
					onChange={handlePaisChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.localidad?.provincia?.pais?.nombre)}
				>
					{paises.map((option, index) => (
						<MenuItem key={index} value={option.id}>
							{option.nombre}
						</MenuItem>
					))}
				</Select>
				<Select
					fullWidth
					name="domicilio.localidad.provincia.nombre"
					value={selectedProvincia}
					onChange={handleProvinciaChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.localidad?.provincia?.nombre)}
					disabled={!selectedPais}
				>
					{filteredProvincias.map((option, index) => (
						<MenuItem key={index} value={option.id}>
							{option.nombre}
						</MenuItem>
					))}
				</Select>
				<Select
					fullWidth
					name="domicilio.localidad.nombre"
					value={localidad.nombre || ""}
					onChange={handleChange}
					onBlur={handleBlur}
					error={Boolean(errors.domicilio?.localidad?.nombre)}
					disabled={!selectedProvincia}
				>
					{filteredLocalidades.map((option, index) => (
						<MenuItem key={index} value={option.id}>
							{option.nombre}
						</MenuItem>
					))}
				</Select>
			</Stack>
		</Stack>
	);
};
