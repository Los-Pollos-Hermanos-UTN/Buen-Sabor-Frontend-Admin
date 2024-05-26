import { ToastContainer, ToastPosition } from "react-toastify";

interface NotificationContainerProps {
	position?: ToastPosition;
}

export const NotificationContainer = ({
	position = 'top-right',
}: NotificationContainerProps) => {
	return (
		<ToastContainer
			position={position}
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
};
