import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		purgeCss(),
		Icons({
			// experimental
			autoInstall: true,
			compiler: 'svelte'
		})
	]
});
