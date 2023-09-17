/* eslint-disable @typescript-eslint/no-explicit-any */
export function checkCookies(cookieNames: string[]): { [key: string]: boolean } {
	const cookies = document.cookie.split('; ').reduce((acc: any, cookie) => {
		const [name, value] = cookie.split('=');
		acc[name] = value;
		return acc;
	}, {});

	const cookiePresence = cookieNames.reduce((acc: any, name) => {
		acc[name] = Object.prototype.hasOwnProperty.call(cookies, name);
		return acc;
	}, {});

	console.log(cookiePresence);

	return cookiePresence;
}
export function parseCookies(cookiesString: string): Record<string, string> {
	return cookiesString.split('; ').reduce((acc, cookie) => {
		const [name, value] = cookie.split('=');
		acc[name] = value;
		return acc;
	}, {} as Record<string, string>);
}
