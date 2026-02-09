export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	return date.toLocaleDateString("en-US", { ...defaultOptions, ...options });
};
