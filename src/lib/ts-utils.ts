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
