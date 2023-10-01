module.exports = {
  '*.{js,ts,svelte,css,postcss}': [
    'prettier --write --plugin-search-dir=.',
    'prettier --check --plugin-search-dir=.'
  ],
  '*.{js,ts,svelte}': 'eslint'
};
