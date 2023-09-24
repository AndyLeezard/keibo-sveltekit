/* eslint-disable @typescript-eslint/no-explicit-any */
export const isOdd = (n: number) => (n & 1) === 1;
export const isJSObject = (obj: any) => Boolean(typeof obj === "object" && obj !== null && !Array.isArray(obj))