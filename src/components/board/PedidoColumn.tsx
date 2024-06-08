import { Stack, Typography } from "@mui/material";
import { Pedido } from "../../types/Pedido";
import { PedidoCard } from "../cards/PedidoCard";
import { Estado } from "../../types/enums/Enums";

interface PedidoColumnProps {
	title: string;
	pedidos: Pedido[];
	onEdit: (pedido: Pedido) => void;
	onShowInfo: (pedido: Pedido) => void;
	onMove: (pedido: Pedido, estado: Estado) => void;
}

export const PedidoColumn = ({
	title,
	pedidos,
	onShowInfo,
}: PedidoColumnProps) => {
	return (
		<Stack spacing={2} width="16%" height="100%" alignItems="center">
			<Typography variant="h5">{title}</Typography>
			{pedidos.map((pedido) => (
				<PedidoCard key={pedido.id} pedido={pedido} onShowInfo={onShowInfo} />
			))}
		</Stack>
	);
};
