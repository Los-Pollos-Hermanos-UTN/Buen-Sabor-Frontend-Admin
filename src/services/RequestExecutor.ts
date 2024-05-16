// Función generica para obtener datos mediante una solicitud GET
export async function getData<T>(path: string): Promise<T> {
	try {
		const response = await fetch(`${path}`);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return await response.json();
	} catch (error) {
		return Promise.reject(error);
	}
}

// Función generica para enviar datos mediante una solicitud POST
export async function postData<T>(path: string, data: T): Promise<T> {
	try {
		const response = await fetch(`${path}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return await response.json();
	} catch (error) {
		return Promise.reject(error);
	}
}

// Función generica para actualizar datos mediante una solicitud PUT
export async function putData<T>(path: string, data: T): Promise<T> {
	try {
		const response = await fetch(`${path}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw Error(response.statusText);
		}
		return await response.json();
	} catch (error) {
		return Promise.reject(error);
	}
}

// Función generica para eliminar datos mediante una solicitud DELETE
export async function deleteData(path: string) {
	try {
		const response = await fetch(`${path}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw Error(response.statusText);
		}
	} catch (error) {
		console.error(error);
	}
}
