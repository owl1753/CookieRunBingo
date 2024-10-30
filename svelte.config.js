import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess(),
}
