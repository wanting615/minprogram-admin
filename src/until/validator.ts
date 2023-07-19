export const isNull = (val: unknown): boolean => {
	return val === undefined || val === null || val === "";
};
