module.exports = {
  '*.json': ['prettier --write'],
  '*.{js,ts,svelte,css,postcss}': ['prettier --write', 'prettier --check'],
  '*.{js,ts,svelte}': 'eslint'
};
