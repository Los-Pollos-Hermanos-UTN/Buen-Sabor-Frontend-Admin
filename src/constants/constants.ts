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
					getUrl: `http://localhost:8080/sucursal/listByEmpresa/${empresa?.id}`,
					postURL: `http://localhost:8080/sucursal/`,
					putURL: `http://localhost:8080/sucursal/`,
					deleteURL: `http://localhost:8080/sucursal/`,
				},
				empresa: {
					getUrl: `http://localhost:8080/empresa/short`,
					postURL: `http://localhost:8080/empresa/save`,
					putURL: `http://localhost:8080/empresa/`,
					deleteURL: `http://localhost:8080/sucursal/`,
				},
				manufacturado: {
					getUrl: `http://localhost:8080/articuloManufacturado/listByEmpresa/${empresa?.id}`,
					postURL: `http://localhost:8080/articuloManufacturado/save`,
					putURL: `http://localhost:8080/articuloManufacturado/edit/`,
					deleteURL: `http://localhost:8080/articuloManufacturado/`,
				},
				insumo: {
					getUrl: `http://localhost:8080/articuloInsumo/listByEmpresa/${empresa?.id}`,
					postURL: `http://localhost:8080/articuloInsumo/save`,
					putURL: `http://localhost:8080/articuloInsumo/edit/`,
					deleteURL: `http://localhost:8080/articuloInsumo/`,
				},
				unidadMedida: {
					getUrl: `http://localhost:8080/unidadMedida`,
					postURL: `http://localhost:8080/unidadMedida/`,
					putURL: `http://localhost:8080/unidadMedida/`,
					deleteURL: `http://localhost:8080/unidadMedida/`,
				},
				categorias: {
					getUrl: `http://localhost:8080/categoria/listByEmpresa/${empresa?.id}`,
					getByIdUrl: `http://localhost:8080/categoria/`,
					postURL: `http://localhost:8080/categoria/save`,
					putURL: `http://localhost:8080/categoria/edit/`,
					deleteURL: `http://localhost:8080/categoria/`,
				},
				paises: {
					getUrl: `http://localhost:8080/pais`,
					postURL: `http://localhost:8080/pais/`,
					putURL: `http://localhost:8080/pais/`,
					deleteURL: `http://localhost:8080/pais/`,
				},
				provincias: {
					getUrl: `http://localhost:8080/provincia`,
					postURL: `http://localhost:8080/provincia/`,
					putURL: `http://localhost:8080/provincia/`,
					deleteURL: `http://localhost:8080/provincia/`,
				},
				localidades: {
					getUrl: `http://localhost:8080/localidad`,
					postURL: `http://localhost:8080/localidad/`,
					putURL: `http://localhost:8080/localidad/`,
					deleteURL: `http://localhost:8080/localidad/`,
				},
				promociones: {
					getUrl: `http://localhost:8080/promocion`,
					postURL: `http://localhost:8080/promocion/save`,
					putURL: `http://localhost:8080/promocion/edit/`,
					deleteURL: `http://localhost:8080/promocion/`,
				},
				pedidos: {
					getUrl: `http://localhost:8080/pedido/listByEmpresa/${empresa?.id}`,
					postURL: `http://localhost:8080/pedido/save`,
					putURL: `http://localhost:8080/pedido/edit/`,
					deleteURL: `http://localhost:8080/pedido/`,
				},
				empleados: {
					getUrl: `http://localhost:8080/empleado`,
					postURL: `http://localhost:8080/empleado/save`,
					putURL: `http://localhost:8080/empleado/edit/`,
					deleteURL: `http://localhost:8080/empleado/`,
				},
		  };
};
