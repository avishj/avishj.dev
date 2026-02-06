// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const isProd = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  site: isProd ? 'https://avishj.github.io' : 'http://localhost:4321',
  base: isProd ? '/avishj.dev' : '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
