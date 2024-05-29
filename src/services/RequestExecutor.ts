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

// Función generica para enviar datos mediante una solicitud PUT (FormData)
export async function putFormData<T>(
	path: string,
	data: T,
	images: File[]
): Promise<T> {
	const formData = new FormData();

	formData.append(
		"data",
		new Blob([JSON.stringify(data)], { type: "application/json" })
	);

	images.forEach((image, index) => {
		if (image instanceof File) {
			formData.append("imagenes", image);
		} else {
			console.warn(`Skipping non-file item at index ${index}`);
		}
	});

	try {
		const response = await fetch(path, {
			method: "PUT",
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const result: T = await response.json();
		return result;
	} catch (error) {
		console.error("Error putting form data:", error);
		throw error;
	}
}

// Función generica para enviar datos mediante una solicitud POST (FormData)
export async function postFormData<T>(
	path: string,
	data: T,
	images: File[]
): Promise<T> {
	const formData = new FormData();

	formData.append(
		"data",
		new Blob([JSON.stringify(data)], { type: "application/json" })
	);
	images.forEach((image, _) => {
		formData.append("imagenes", image);
	});

	try {
		const response = await fetch(path, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const result: T = await response.json();
		return result;
	} catch (error) {
		console.error("Error posting form data:", error);
		throw error;
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
