module.exports = {
  "*.{js,jsx}": [
    "prettier --write",
    "eslint --cache --fix",
  ],
  "*.{ts,tsx}": [
    "prettier --write",
    () => "tsc --skipLibCheck --noEmit", 
    "eslint --cache --fix",
  ],
  "*.svelte": [
    "prettier --write",
    "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
  ],
}
