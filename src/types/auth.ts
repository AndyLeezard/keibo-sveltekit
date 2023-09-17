declare global {
	/** auth session utils */
	type SerializedUser = {
		email: string;
		first_name: string;
		last_name: string;
		id: number;
	};
}

export type module = unknown;
