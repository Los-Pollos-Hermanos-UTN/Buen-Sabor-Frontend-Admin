export enum Action {
	CREATE,
	LIST,
}

export enum Estado {
	PENDIENTE,
	PREPARACION,
	RETIRAR,
	ENTREGADO,
	CANCELADO,
	RECHAZADO,
}

export const ArrayEstados = Object.values(Estado).filter((value) =>
	isNaN(Number(value))
);

export enum TipoEnvio {
	DELIVERY,
	RETIRO,
}

export enum FormaPago {
	EEFCTIVO,
	TARJETA,
}
