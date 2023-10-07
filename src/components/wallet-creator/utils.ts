export function generatePreviousArray(currentPage: number, size: number) {
  return Array.from({ length: size }, (_, i) => currentPage - 1 - i).filter((i) => i >= 0);
}

export function generateNextArray(currentPage: number, size: number, max: number) {
  return Array.from({ length: size }, (_, i) => currentPage + 1 + i).filter((i) => i <= max);
}
