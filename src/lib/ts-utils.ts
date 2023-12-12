/* eslint-disable @typescript-eslint/no-explicit-any */
export const isOdd = (n: number) => (n & 1) === 1;
export const isJSObject = (obj: any) =>
  Boolean(typeof obj === 'object' && obj !== null && !Array.isArray(obj));

export function countNonNullValues<T extends Record<string, any>>(record: T): number {
  let count = 0;
  for (const key in record) {
    if (record[key] != null) {
      // Using loose inequality to check for both `null` and `undefined`
      count++;
    }
  }
  return count;
}
export function toPositiveInt<T>(str: string | null, fallbackValue: T) {
  if (str === null) return fallbackValue;
  const num = parseInt(str, 10);
  if (isNaN(num)) return fallbackValue;
  return num;
}
export const normalizeStr = (str: string, unifyCase?: 'uppercase' | 'lowercase') => {
  const res = str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  if (unifyCase === 'uppercase') {
    return res.toUpperCase();
  }
  if (unifyCase === 'lowercase') {
    return res.toLowerCase();
  }
  return res;
};
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
/** Precision-level: seconds */
export const formatDate = (date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
