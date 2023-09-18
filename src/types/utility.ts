declare global {
	type Optional<T> = T | undefined;
	type ValueOf<T> = T[keyof T]
  type PartiallyOptional<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>
  type PartiallyRequired<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>
  type RequiredAttributes<T> = {
    [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
  }
}

export type module = unknown;
