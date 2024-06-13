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
					getUrl: `https://buensaborfix-8w6n.onrender.com/sucursal/listByEmpresa/${empresa?.id}`,
					postURL: "https://buensaborfix-8w6n.onrender.com/sucursal/",
					putURL: "https://buensaborfix-8w6n.onrender.com/sucursal/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/sucursal/",
				},
				empresa: {
					getUrl: "https://buensaborfix-8w6n.onrender.com/empresa/short",
					postURL: "https://buensaborfix-8w6n.onrender.com/empresa/save",
					putURL: "https://buensaborfix-8w6n.onrender.com/empresa/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/sucursal/",
				},
				manufacturado: {
					getUrl: `https://buensaborfix-8w6n.onrender.com/articuloManufacturado/listByEmpresa/${empresa?.id}`,
					postURL:
						"https://buensaborfix-8w6n.onrender.com/articuloManufacturado/save",
					putURL:
						"https://buensaborfix-8w6n.onrender.com/articuloManufacturado/edit/",
					deleteURL:
						"https://buensaborfix-8w6n.onrender.com/articuloManufacturado/",
				},
				insumo: {
					getUrl: `https://buensaborfix-8w6n.onrender.com/articuloInsumo/listByEmpresa/${empresa?.id}`,
					postURL: "https://buensaborfix-8w6n.onrender.com/articuloInsumo/save",
					putURL: "https://buensaborfix-8w6n.onrender.com/articuloInsumo/edit/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/articuloInsumo/",
				},
				unidadMedida: {
					getUrl: "https://buensaborfix-8w6n.onrender.com/unidadMedida",
					postURL: "https://buensaborfix-8w6n.onrender.com/unidadMedida/",
					putURL: "https://buensaborfix-8w6n.onrender.com/unidadMedida/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/unidadMedida/",
				},
				categorias: {
					getUrl: `https://buensaborfix-8w6n.onrender.com/categoria/listByEmpresa/${empresa?.id}`,
					getByIdUrl: `https://buensaborfix-8w6n.onrender.com/categoria/`,
					postURL: "https://buensaborfix-8w6n.onrender.com/categoria/save",
					putURL: "https://buensaborfix-8w6n.onrender.com/categoria/edit/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/categoria/",
				},
				paises: {
					getUrl: "https://buensaborfix-8w6n.onrender.com/pais",
					postURL: "https://buensaborfix-8w6n.onrender.com/pais/",
					putURL: "https://buensaborfix-8w6n.onrender.com/pais/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/pais/",
				},
				provincias: {
					getUrl: "https://buensaborfix-8w6n.onrender.com/provincia",
					postURL: "https://buensaborfix-8w6n.onrender.com/provincia/",
					putURL: "https://buensaborfix-8w6n.onrender.com/provincia/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/provincia/",
				},
				localidades: {
					getUrl: "https://buensaborfix-8w6n.onrender.com/localidad",
					postURL: "https://buensaborfix-8w6n.onrender.com/localidad/",
					putURL: "https://buensaborfix-8w6n.onrender.com/localidad/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/localidad/",
				},
				promociones: {
					getUrl: "https://buensaborfix-8w6n.onrender.com/promocion",
					postURL: "https://buensaborfix-8w6n.onrender.com/promocion/save",
					putURL: "https://buensaborfix-8w6n.onrender.com/promocion/edit/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/promocion/",
				},
				pedidos: {
					getUrl: `https://buensaborfix-8w6n.onrender.com/pedido/listByEmpresa/${empresa?.id}`,
					postURL: "https://buensaborfix-8w6n.onrender.com/pedido/save",
					putURL: "https://buensaborfix-8w6n.onrender.com/pedido/edit/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/pedido/",
				},
				empleados: {
					getUrl: `https://buensaborfix-8w6n.onrender.com/empleado`,
					postURL: "https://buensaborfix-8w6n.onrender.com/empleado/save",
					putURL: "https://buensaborfix-8w6n.onrender.com/empleado/edit/",
					deleteURL: "https://buensaborfix-8w6n.onrender.com/empleado/",
				},
		  }
		: {
				sucursal: {
					getUrl: `http://localhost:8080/sucursal/listByEmpresa/${empresa?.id}`,
					postURL: "http://localhost:8080/sucursal/",
					putURL: "http://localhost:8080/sucursal/",
					deleteURL: "http://localhost:8080/sucursal/",
				},
				empresa: {
					getUrl: "http://localhost:8080/empresa/short",
					postURL: "http://localhost:8080/empresa/save",
					putURL: "http://localhost:8080/empresa/",
					deleteURL: "http://localhost:8080/sucursal/",
				},
				manufacturado: {
					getUrl: `http://localhost:8080/articuloManufacturado/listByEmpresa/${empresa?.id}`,
					postURL: "http://localhost:8080/articuloManufacturado/save",
					putURL: "http://localhost:8080/articuloManufacturado/edit/",
					deleteURL: "http://localhost:8080/articuloManufacturado/",
				},
				insumo: {
					getUrl: `http://localhost:8080/articuloInsumo/listByEmpresa/${empresa?.id}`,
					postURL: "http://localhost:8080/articuloInsumo/save",
					putURL: "http://localhost:8080/articuloInsumo/edit/",
					deleteURL: "http://localhost:8080/articuloInsumo/",
				},
				unidadMedida: {
					getUrl: "http://localhost:8080/unidadMedida",
					postURL: "http://localhost:8080/unidadMedida/",
					putURL: "http://localhost:8080/unidadMedida/",
					deleteURL: "http://localhost:8080/unidadMedida/",
				},
				categorias: {
					getUrl: `http://localhost:8080/categoria/listByEmpresa/${empresa?.id}`,
					getByIdUrl: `http://localhost:8080/categoria/`,
					postURL: "http://localhost:8080/categoria/save",
					putURL: "http://localhost:8080/categoria/edit/",
					deleteURL: "http://localhost:8080/categoria/",
				},
				paises: {
					getUrl: "http://localhost:8080/pais",
					postURL: "http://localhost:8080/pais/",
					putURL: "http://localhost:8080/pais/",
					deleteURL: "http://localhost:8080/pais/",
				},
				provincias: {
					getUrl: "http://localhost:8080/provincia",
					postURL: "http://localhost:8080/provincia/",
					putURL: "http://localhost:8080/provincia/",
					deleteURL: "http://localhost:8080/provincia/",
				},
				localidades: {
					getUrl: "http://localhost:8080/localidad",
					postURL: "http://localhost:8080/localidad/",
					putURL: "http://localhost:8080/localidad/",
					deleteURL: "http://localhost:8080/localidad/",
				},
				promociones: {
					getUrl: "http://localhost:8080/promocion",
					postURL: "http://localhost:8080/promocion/save",
					putURL: "http://localhost:8080/promocion/edit/",
					deleteURL: "http://localhost:8080/promocion/",
				},
				pedidos: {
					getUrl: `http://localhost:8080/pedido/listByEmpresa/${empresa?.id}`,
					postURL: "http://localhost:8080/pedido/save",
					putURL: "http://localhost:8080/pedido/edit/",
					deleteURL: "http://localhost:8080/pedido/",
				},
				empleados: {
					getUrl: `http://localhost:8080/empleado`,
					postURL: "http://localhost:8080/empleado/save",
					putURL: "http://localhost:8080/empleado/edit/",
					deleteURL: "http://localhost:8080/empleado/",
				},
		  };
};
