import { Sucursal } from "./Sucursal";
import { Domicilio } from "./Domicilio";
import { Estado, FormaPago, TipoEnvio } from "./enums/Enums";

export interface Pedido {
	id: number | null;
	eliminado: boolean;
	horaEstimadaFinalizacion: string;
	total: number;
	totalCosto: number;
	estado: Estado;
	tipoEnvio: TipoEnvio;
	formaPago: FormaPago;
	fechaPedido: string;
	domicilio: Domicilio | null;
	sucursal: Sucursal;
	factura: any | null;
	cliente: any | null;
	detallePedidos: DetallePedido[];
	empleado: any | null;
}

export interface DetallePedido {
	id: number;
	eliminado: boolean;
	cantidad: number;
	subTotal: number;
	articulo: Articulo;
}

export interface Articulo {
	id: number;
	eliminado: boolean;
	denominacion: string;
	precioVenta: number;
	imagenes: any[];
	unidadMedida: null;
	categoriaId: null;
	sucursales: any[];
}
