const env = "local";

export const CONSTANTS =
	env !== "local"
		? {
				sucursal: {
					getUrl: "https://buensaborfix.onrender.com/sucursal/short",
					postURL: "https://buensaborfix.onrender.com/sucursal/",
				},
				empresa: {
					getUrl: "https://buensaborfix.onrender.com/empresa/short",
					postURL: "https://buensaborfix.onrender.com/empresa/",
				},
				manufacturado: {
					getUrl: "https://buensaborfix.onrender.com/articuloManufacturado",
					postURL:
						"https://buensaborfix.onrender.com/articuloManufacturado/save",
				},
				insumo: {
					getUrl: "https://buensaborfix.onrender.com/articuloInsumo",
					postURL: "https://buensaborfix.onrender.com/articuloInsumo/save",
				},
				unidadMedida: {
					getUrl: "https://buensaborfix.onrender.com/unidadMedida",
					postURL: "https://buensaborfix.onrender.com/unidadMedida/",
				},
				categorias: {
					getUrl: "https://buensaborfix.onrender.com/categoria/getAll",
					postURL: "https://buensaborfix.onrender.com/categoria/save",
				},
				paises: {
					getUrl: "https://buensaborfix.onrender.com/paises",
					postURL: "https://buensaborfix.onrender.com/paises/",
				},
				provincias: {
					getUrl: "https://buensaborfix.onrender.com/provincias",
					postURL: "https://buensaborfix.onrender.com/provincias/",
				},
				localidades: {
					getUrl: "https://buensaborfix.onrender.com/localidades",
					postURL: "https://buensaborfix.onrender.com/localidades/",
				},
		  }
		: {
				sucursal: {
					getUrl: "http://localhost:8080/sucursal/short",
					postURL: "http://localhost:8080/sucursal/",
				},
				empresa: {
					getUrl: "http://localhost:8080/empresa/short",
					postURL: "http://localhost:8080/empresa/",
				},
				manufacturado: {
					getUrl: "http://localhost:8080/articuloManufacturado",
					postURL: "http://localhost:8080/articuloManufacturado/save",
				},
				insumo: {
					getUrl: "http://localhost:8080/articuloInsumo",
					postURL: "http://localhost:8080/articuloInsumo/save",
				},
				unidadMedida: {
					getUrl: "http://localhost:8080/unidadMedida",
					postURL: "http://localhost:8080/unidadMedida/",
				},
				categorias: {
					getUrl: "http://localhost:8080/categoria/getAll",
					postURL: "http://localhost:8080/categoria/save",
				},
				paises: {
					getUrl: "http://localhost:8080/pais",
					postURL: "http://localhost:8080/pais/",
				},
				provincias: {
					getUrl: "http://localhost:8080/provincia",
					postURL: "http://localhost:8080/provincia/",
				},
				localidades: {
					getUrl: "http://localhost:8080/localidad",
					postURL: "http://localhost:8080/localidad/",
				},
		  };
