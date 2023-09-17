import { writable } from 'svelte/store';

export const user = writable<SerializedUser | null | undefined>(undefined);
