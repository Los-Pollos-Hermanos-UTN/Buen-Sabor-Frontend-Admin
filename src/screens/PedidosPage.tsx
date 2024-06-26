import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/shared/SearchBar";
import { getConstants } from "../constants/constants";
import { getData, putData } from "../services/RequestExecutor";
import { searchInObject } from "../utils/SearchUtils";
import { Pedido } from "../types/Pedido";
import { PedidoDetailModal } from "../components/modals/details/PedidoDetailModal";
import { PedidosBoard } from "../components/board/PedidosBoard";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { formatFecha } from "../utils/DateTimeUtils";

export const PedidosPage = () => {
	const CONSTANTS = getConstants();
	const [searchTerm, setSearchTerm] = useState("");

	const [pedidos, setPedidos] = useState<Pedido[]>([]);
	const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

	const [fecha, setFecha] = useState<string | Date | Dayjs>(
		dayjs().format("YYYY-MM-DD")
	);

	const [detailOpen, setDetailOpen] = useState<boolean>(false);
	const [detailPedido, setDetailPedido] = useState<Pedido | null>(null);

	useEffect(() => {
		const getPedidos = async () => {
			try {
				const response = await getData<Pedido[]>(
					`${CONSTANTS.pedidos.getByDayUrl}${fecha}`
				);

				if (response.length === 0) {
					setPedidos([]);
				} else {
					setPedidos(response);
				}
			} catch (error) {
				console.error(error);
				setPedidos([]);
			}
		};
		getPedidos();
	}, [fecha]);

	const handleSearch = (newSearchTerm: string) => {
		setSearchTerm(newSearchTerm);
	};

	const filteredPedidos = pedidos.filter((pedido) =>
		searchInObject(pedido, searchTerm)
	);

	const handleEdit = (pedido: Pedido) => {
		setSelectedPedido(pedido);
		// Handle edit logic
	};

	const handleShowInfo = (pedido: Pedido) => {
		setDetailPedido(pedido);
		setDetailOpen(true);
	};

	const handleMove = async (pedido: Pedido, estado: Pedido["estado"]) => {
		try {
			const updatedPedido = { ...pedido, estado };
			await putData(`${CONSTANTS.pedidos.putURL}${pedido.id}`, updatedPedido);
			setPedidos((prevPedidos) =>
				prevPedidos.map((p) => (p.id === pedido.id ? updatedPedido : p))
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Stack direction="column" m="3%" spacing={5} height="85%">
				<SearchBar
					showAddButton={false}
					onSearch={handleSearch}
					extraButtons={[
						<DatePicker
							key="datepicker"
							sx={{
								bgcolor: "#fff",
								borderRadius: "5px",
								height: "50px",
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										border: "none",
									},
								},
							}}
							value={fecha ? dayjs(fecha) : null}
							onChange={(date) => setFecha(formatFecha(date))}
						/>,
					]}
				/>
				<PedidosBoard
					pedidos={filteredPedidos}
					onEdit={handleEdit}
					onShowInfo={handleShowInfo}
					onMove={handleMove}
				/>
			</Stack>
			{detailOpen && detailPedido && (
				<PedidoDetailModal
					pedido={detailPedido}
					width={700}
					height={600}
					open={detailOpen}
					handleClose={() => setDetailOpen(false)}
					onMove={handleMove}
				/>
			)}
		</>
	);
};
