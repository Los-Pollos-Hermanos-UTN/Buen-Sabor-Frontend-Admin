import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const getConstants = () => {
	const empresa = useSelector(
		(state: RootState) => state.empresa.selectedEmpresa
	);

	let env = "prod";
	return env !== "local"
		? {
				sucursal: {
					getUrl: `${import.meta.env.VITE_API_URL}/sucursal/listByEmpresa/${
						empresa?.id
					}`,
					postURL: `${import.meta.env.VITE_API_URL}/sucursal/`,
					putURL: `${import.meta.env.VITE_API_URL}/sucursal/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/sucursal/`,
				},
				empresa: {
					getUrl: `${import.meta.env.VITE_API_URL}/empresa/short`,
					postURL: `${import.meta.env.VITE_API_URL}/empresa/save`,
					putURL: `${import.meta.env.VITE_API_URL}/empresa/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/sucursal/`,
				},
				manufacturado: {
					getUrl: `${
						import.meta.env.VITE_API_URL
					}/articuloManufacturado/listByEmpresa/${empresa?.id}`,
					postURL: `${import.meta.env.VITE_API_URL}/articuloManufacturado/save`,
					putURL: `${import.meta.env.VITE_API_URL}/articuloManufacturado/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/articuloManufacturado/`,
				},
				insumo: {
					getUrl: `${
						import.meta.env.VITE_API_URL
					}/articuloInsumo/listByEmpresa/${empresa?.id}`,
					postURL: `${import.meta.env.VITE_API_URL}/articuloInsumo/save`,
					putURL: `${import.meta.env.VITE_API_URL}/articuloInsumo/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/articuloInsumo/`,
				},
				unidadMedida: {
					getUrl: `${import.meta.env.VITE_API_URL}/unidadMedida`,
					postURL: `${import.meta.env.VITE_API_URL}/unidadMedida/`,
					putURL: `${import.meta.env.VITE_API_URL}/unidadMedida/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/unidadMedida/`,
				},
				categorias: {
					getUrl: `${import.meta.env.VITE_API_URL}/categoria/listByEmpresa/${
						empresa?.id
					}`,
					getByIdUrl: `${import.meta.env.VITE_API_URL}/categoria/`,
					postURL: `${import.meta.env.VITE_API_URL}/categoria/save`,
					putURL: `${import.meta.env.VITE_API_URL}/categoria/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/categoria/`,
				},
				paises: {
					getUrl: `${import.meta.env.VITE_API_URL}/pais`,
					postURL: `${import.meta.env.VITE_API_URL}/pais/`,
					putURL: `${import.meta.env.VITE_API_URL}/pais/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/pais/`,
				},
				provincias: {
					getUrl: `${import.meta.env.VITE_API_URL}/provincia`,
					postURL: `${import.meta.env.VITE_API_URL}/provincia/`,
					putURL: `${import.meta.env.VITE_API_URL}/provincia/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/provincia/`,
				},
				localidades: {
					getUrl: `${import.meta.env.VITE_API_URL}/localidad`,
					postURL: `${import.meta.env.VITE_API_URL}/localidad/`,
					putURL: `${import.meta.env.VITE_API_URL}/localidad/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/localidad/`,
				},
				promociones: {
					getUrl: `${import.meta.env.VITE_API_URL}/promocion`,
					postURL: `${import.meta.env.VITE_API_URL}/promocion/save`,
					putURL: `${import.meta.env.VITE_API_URL}/promocion/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/promocion/`,
				},
				pedidos: {
					getUrl: `${import.meta.env.VITE_API_URL}/pedido/listByEmpresa/${
						empresa?.id
					}`,
					getByDayUrl: `${import.meta.env.VITE_API_URL}/pedido/empresa/${
						empresa?.id
					}/listByDay?fecha=`,
					postURL: `${import.meta.env.VITE_API_URL}/pedido/save`,
					putURL: `${import.meta.env.VITE_API_URL}/pedido/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/pedido/`,
				},
				empleados: {
					getUrl: `${import.meta.env.VITE_API_URL}/empleado`,
					postURL: `${import.meta.env.VITE_API_URL}/empleado/save`,
					putURL: `${import.meta.env.VITE_API_URL}/empleado/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/empleado/`,
				},
		  }
		: {
				sucursal: {
					getUrl: `${import.meta.env.VITE_API_URL}/sucursal/listByEmpresa/${
						empresa?.id
					}`,
					postURL: `${import.meta.env.VITE_API_URL}/sucursal/`,
					putURL: `${import.meta.env.VITE_API_URL}/sucursal/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/sucursal/`,
				},
				empresa: {
					getUrl: `${import.meta.env.VITE_API_URL}/empresa/short`,
					postURL: `${import.meta.env.VITE_API_URL}/empresa/save`,
					putURL: `${import.meta.env.VITE_API_URL}/empresa/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/sucursal/`,
				},
				manufacturado: {
					getUrl: `${
						import.meta.env.VITE_API_URL
					}/articuloManufacturado/listByEmpresa/${empresa?.id}`,
					postURL: `${import.meta.env.VITE_API_URL}/articuloManufacturado/save`,
					putURL: `${import.meta.env.VITE_API_URL}/articuloManufacturado/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/articuloManufacturado/`,
				},
				insumo: {
					getUrl: `${
						import.meta.env.VITE_API_URL
					}/articuloInsumo/listByEmpresa/${empresa?.id}`,
					postURL: `${import.meta.env.VITE_API_URL}/articuloInsumo/save`,
					putURL: `${import.meta.env.VITE_API_URL}/articuloInsumo/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/articuloInsumo/`,
				},
				unidadMedida: {
					getUrl: `${import.meta.env.VITE_API_URL}/unidadMedida`,
					postURL: `${import.meta.env.VITE_API_URL}/unidadMedida/`,
					putURL: `${import.meta.env.VITE_API_URL}/unidadMedida/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/unidadMedida/`,
				},
				categorias: {
					getUrl: `${import.meta.env.VITE_API_URL}/categoria/listByEmpresa/${
						empresa?.id
					}`,
					getByIdUrl: `${import.meta.env.VITE_API_URL}/categoria/`,
					postURL: `${import.meta.env.VITE_API_URL}/categoria/save`,
					putURL: `${import.meta.env.VITE_API_URL}/categoria/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/categoria/`,
				},
				paises: {
					getUrl: `${import.meta.env.VITE_API_URL}/pais`,
					postURL: `${import.meta.env.VITE_API_URL}/pais/`,
					putURL: `${import.meta.env.VITE_API_URL}/pais/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/pais/`,
				},
				provincias: {
					getUrl: `${import.meta.env.VITE_API_URL}/provincia`,
					postURL: `${import.meta.env.VITE_API_URL}/provincia/`,
					putURL: `${import.meta.env.VITE_API_URL}/provincia/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/provincia/`,
				},
				localidades: {
					getUrl: `${import.meta.env.VITE_API_URL}/localidad`,
					postURL: `${import.meta.env.VITE_API_URL}/localidad/`,
					putURL: `${import.meta.env.VITE_API_URL}/localidad/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/localidad/`,
				},
				promociones: {
					getUrl: `${import.meta.env.VITE_API_URL}/promocion`,
					postURL: `${import.meta.env.VITE_API_URL}/promocion/save`,
					putURL: `${import.meta.env.VITE_API_URL}/promocion/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/promocion/`,
				},
				pedidos: {
					getUrl: `${import.meta.env.VITE_API_URL}/pedido/listByEmpresa/${
						empresa?.id
					}`,
					getByDayUrl: `${import.meta.env.VITE_API_URL}/pedido/empresa/${
						empresa?.id
					}/listByDay?fecha=`,
					postURL: `${import.meta.env.VITE_API_URL}/pedido/save`,
					putURL: `${import.meta.env.VITE_API_URL}/pedido/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/pedido/`,
				},
				empleados: {
					getUrl: `${import.meta.env.VITE_API_URL}/empleado`,
					postURL: `${import.meta.env.VITE_API_URL}/empleado/save`,
					putURL: `${import.meta.env.VITE_API_URL}/empleado/edit/`,
					deleteURL: `${import.meta.env.VITE_API_URL}/empleado/`,
				},
		  };
};
