import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import inlangPlugin from '@inlang/sdk-js/adapter-sveltekit';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [
    inlangPlugin(),
    sveltekit(),
    purgeCss(),
    Icons({
      // experimental
      autoInstall: true,
      compiler: 'svelte'
    })
  ],
  server: {
    port: 3000
    /* Use this to enable local network access from other machines */
    /* host: '0.0.0.0' */
  },
  preview: {
    port: 3000
    /* host: "0.0.0.0", */
  }
});
