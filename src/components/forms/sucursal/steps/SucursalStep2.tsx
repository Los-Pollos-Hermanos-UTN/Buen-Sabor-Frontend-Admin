import { Autocomplete, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CONSTANTS } from "../../../../constants/constants";
import { getData } from "../../../../services/RequestExecutor";
import { Pais } from "../../../../types/Pais";
import { Provincia } from "../../../../types/Provincia";
import { Localidad } from "../../../../types/Localidad";

export const SucursalStep2 = (props: any) => {
	const { values, errors, handleChange, handleBlur, setFieldValue } = props;

	const [paises, setPaises] = useState<Pais[]>([]);
	const [provincias, setProvincias] = useState<Provincia[]>([]);
	const [localidades, setLocalidades] = useState<Localidad[]>([]);

	const [selectedPais, setSelectedPais] = useState<Pais | null>(null);
	const [selectedProvincia, setSelectedProvincia] = useState<Provincia | null>(
		null
	);

	const [filteredProvincias, setFilteredProvincias] = useState<Provincia[]>([]);
	const [filteredLocalidades, setFilteredLocalidades] = useState<Localidad[]>(
		[]
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [paisesData, provinciasData, localidadesData] = await Promise.all(
					[
						getData<Pais[]>(CONSTANTS.paises.getUrl),
						getData<Provincia[]>(CONSTANTS.provincias.getUrl),
						getData<Localidad[]>(CONSTANTS.localidades.getUrl),
					]
				);
				setPaises(paisesData);
				setProvincias(provinciasData);
				setLocalidades(localidadesData);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (selectedPais) {
			setFilteredProvincias(
				provincias.filter((provincia) => provincia.pais.id === selectedPais.id)
			);
		} else {
			setFilteredProvincias([]);
		}
		setSelectedProvincia(null); // reset provincia when pais changes
		setFilteredLocalidades([]);
		setFieldValue("domicilio.localidad", null);
	}, [selectedPais, provincias, setFieldValue]);

	useEffect(() => {
		if (selectedProvincia) {
			setFilteredLocalidades(
				localidades.filter(
					(localidad) => localidad.provincia.id === selectedProvincia.id
				)
			);
		} else {
			setFilteredLocalidades([]);
		}
		setFieldValue("domicilio.localidad", null);
	}, [selectedProvincia, localidades, setFieldValue]);

	const handlePaisChange = (event: any, value: Pais | null) => {
		setSelectedPais(value);
		setFieldValue("domicilio.localidad.provincia.pais", value);
	};

	const handleProvinciaChange = (event: any, value: Provincia | null) => {
		setSelectedProvincia(value);
		setFieldValue("domicilio.localidad.provincia", value);
	};

	const handleLocalidadChange = (event: any, value: Localidad | null) => {
		setFieldValue("domicilio.localidad", value);
	};

	const domicilio = values.domicilio || {};
	const localidad = domicilio.localidad || {};
	const provincia = localidad.provincia || {};
	const pais = provincia.pais || {};

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
				<Autocomplete
					fullWidth
					options={paises}
					getOptionLabel={(option) => option.nombre}
					value={selectedPais || (pais as Pais)}
					onChange={handlePaisChange}
					onBlur={handleBlur}
					renderInput={(params) => (
						<TextField
							{...params}
							label="País"
							error={Boolean(errors.domicilio?.localidad?.provincia?.pais)}
							helperText={errors.domicilio?.localidad?.provincia?.pais}
						/>
					)}
				/>
				<Autocomplete
					fullWidth
					options={filteredProvincias}
					getOptionLabel={(option) => option.nombre}
					value={selectedProvincia || (provincia as Provincia)}
					onChange={handleProvinciaChange}
					onBlur={handleBlur}
					disabled={!selectedPais}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Provincia"
							error={Boolean(errors.domicilio?.localidad?.provincia)}
							helperText={errors.domicilio?.localidad?.provincia}
						/>
					)}
				/>
				<Autocomplete
					fullWidth
					options={filteredLocalidades}
					getOptionLabel={(option) => option.nombre}
					value={localidad as Localidad}
					onChange={handleLocalidadChange}
					onBlur={handleBlur}
					disabled={!selectedProvincia}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Localidad"
							error={Boolean(errors.domicilio?.localidad)}
							helperText={errors.domicilio?.localidad}
						/>
					)}
				/>
			</Stack>
		</Stack>
	);
};
