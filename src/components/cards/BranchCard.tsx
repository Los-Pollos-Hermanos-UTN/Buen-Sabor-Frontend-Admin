import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Rating, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";
import { Sucursal } from "../../types/Sucursal";

interface BranchCardProps {
	sucursal: Sucursal;
	handleEdit: (sucursal: Sucursal) => void;
}

export function BranchCard({ sucursal, handleEdit }: BranchCardProps) {
	const handleGoTo = (sucursal: Sucursal) => {
		const { calle, numero, cp, localidad } = sucursal.domicilio;
		const { nombre: localidadNombre, provincia } = localidad;
		const { nombre: provinciaNombre, pais } = provincia;
		const { nombre: paisNombre } = pais;

		const address = `${calle} ${numero}, ${cp}, ${localidadNombre}, ${provinciaNombre}, ${paisNombre}`;
		const encodedAddress = encodeURIComponent(address);
		const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
		window.location.href = mapsUrl;
	};

	const getGoogleMapsEmbedUrl = (sucursal: Sucursal) => {
		const { calle, numero, cp, localidad } = sucursal.domicilio;
		const { nombre: localidadNombre, provincia } = localidad;
		const { nombre: provinciaNombre, pais } = provincia;
		const { nombre: paisNombre } = pais;

		const address = `${calle} ${numero}, ${cp}, ${localidadNombre}, ${provinciaNombre}, ${paisNombre}`;
		const encodedAddress = encodeURIComponent(address);
		return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z${encodedAddress}!5e0!3m2!1ses!2s!4v0`;
	};

	return (
		<Card
			sx={{
				maxWidth: 450,
				backgroundColor: "rgba(0,0,0, 0.3)",
				borderRadius: "8px",
			}}
		>
			<Stack direction="row">
				<CardContent>
					<Stack height="100%">
						<Typography gutterBottom variant="h5" component="div" color="white">
							{sucursal.nombre}
						</Typography>
						<Stack height="100%" justifyContent="space-between">
							<Stack>
								<Button
									sx={{
										color: "white",
										textTransform: "capitalize",
										width: "100%",
										justifyContent: "flex-start",
									}}
									startIcon={<EditIcon />}
									onClick={() => handleEdit(sucursal)}
								>
									<Typography>Editar</Typography>
								</Button>
								<Button
									sx={{
										color: "white",
										textTransform: "capitalize",
										width: "100%",
										justifyContent: "flex-start",
									}}
									startIcon={<RoomIcon />}
									onClick={() => handleGoTo(sucursal)}
								>
									<Typography>Ubicación</Typography>
								</Button>
							</Stack>
							<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
						</Stack>
					</Stack>
				</CardContent>

				<iframe
					src={`https://www.google.com/maps?q=${encodeURIComponent(`${sucursal.domicilio.calle} ${sucursal.domicilio.numero}, ${sucursal.domicilio.cp}, ${sucursal.domicilio.localidad.nombre}, ${sucursal.domicilio.localidad.provincia.nombre}, ${sucursal.domicilio.localidad.provincia.pais.nombre}`)}&output=embed`}
					width="450"
					height="320"
					style={{ border: 0 }}
					loading="lazy"
					allowFullScreen
				></iframe>
			</Stack>
		</Card>
	);
}
