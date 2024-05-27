import dayjs, { Dayjs } from "dayjs";

export const formatFecha = (date: Dayjs | null) => {
	return date ? dayjs(date).format("YYYY-MM-DD") : "";
};

export const formatHora = (time: Dayjs | null) => {
	return time ? dayjs(time).format("HH:mm:ss") : "";
};
