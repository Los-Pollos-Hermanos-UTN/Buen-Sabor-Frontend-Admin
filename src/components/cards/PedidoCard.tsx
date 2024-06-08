import { Card, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import { Pedido } from "../../types/Pedido";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface PedidoCardProps {
	pedido: Pedido;
	onShowInfo: (pedido: Pedido) => void;
}

export const PedidoCard = ({ pedido, onShowInfo }: PedidoCardProps) => {
	return (
		<Card variant="outlined" sx={{ width: 180, borderRadius: "8px" }}>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				p="4% 8%"
			>
				<Typography>{`#${pedido.id}`}</Typography>

				<Tooltip title="Ver Más" placement="left" arrow>
					<IconButton onClick={() => onShowInfo(pedido)}>
						<InfoOutlinedIcon />
					</IconButton>
				</Tooltip>
			</Stack>
		</Card>
	);
};
