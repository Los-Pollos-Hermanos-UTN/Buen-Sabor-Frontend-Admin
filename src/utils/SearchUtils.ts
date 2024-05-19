export const searchInObject = (obj: any, searchTerm: string) => {
	if (!searchTerm) return true;

	const searchString = searchTerm.toLowerCase();

	const searchRecursively = (item: any): boolean => {
		if (
			typeof item === "string" ||
			typeof item === "number" ||
			typeof item === "boolean"
		) {
			return item.toString().toLowerCase().includes(searchString);
		}

		if (item && typeof item === "object") {
			return Object.values(item).some((value) => searchRecursively(value));
		}

		return false;
	};

	return searchRecursively(obj);
};
