import { Modal, Box, Typography, Button, Stack } from "@mui/material";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	borderRadius: "20px",
	boxShadow: 24,
	p: 4,
};

interface ConfirmationModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	message: string;
}

export const ConfirmationModal = ({
	open,
	onClose,
	onConfirm,
	message,
}: ConfirmationModalProps) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Confirmación
				</Typography>
				<Typography sx={{ mb: 4 }}>{message}</Typography>
				<Stack direction="row" spacing={2} justifyContent="flex-end">
					<Button
						onClick={onClose}
						variant="contained"
						sx={{
							width: "20%",
							textTransform: "none",
							backgroundColor: "#49111C",
							"&:hover": {
								backgroundColor: "#49111C",
							},
						}}
					>
						Cancelar
					</Button>
					<Button
						onClick={onConfirm}
						variant="contained"
						sx={{
							width: "20%",
							textTransform: "none",
							backgroundColor: "#49111C",
							"&:hover": {
								backgroundColor: "#49111C",
							},
						}}
						color="primary"
					>
						Confirmar
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};
