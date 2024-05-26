import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => {
	return (
		<CircularProgress
		size={25}
			sx={{
				color: "white",
			}}
		/>
	);
};
