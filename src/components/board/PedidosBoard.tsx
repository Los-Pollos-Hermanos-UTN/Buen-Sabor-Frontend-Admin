import { Stack } from "@mui/material";
import { PedidoColumn } from "./PedidoColumn";
import { Pedido } from "../../types/Pedido";
import { ArrayEstados, Estado } from "../../types/enums/Enums";

interface PedidosBoardProps {
	pedidos: Pedido[];
	onEdit: (pedido: Pedido) => void;
	onShowInfo: (pedido: Pedido) => void;
	onMove: (pedido: Pedido, estado: Estado) => void;
}

export const PedidosBoard = ({
	pedidos,
	onEdit,
	onShowInfo,
	onMove,
}: PedidosBoardProps) => {
	return (
		<Stack direction="row" spacing={2} height='100%'>
			{ArrayEstados.map((estado) => (
				<PedidoColumn
					key={estado}
					title={`${estado.toString().charAt(0).toUpperCase()}${estado
						.toString()
						.toLowerCase()
						.slice(1)}`}
					pedidos={pedidos.filter(
						(pedido) => pedido.estado.toString() === estado
					)}
					onEdit={onEdit}
					onShowInfo={onShowInfo}
					onMove={onMove}
				/>
			))}
		</Stack>
	);
};
