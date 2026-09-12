import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

const PRODUCTION_SITE_URL = 'https://www.bifurkate.com';

const getSiteUrl = () => (process.env.DEPLOY_PRIME_URL ?? process.env.URL ?? PRODUCTION_SITE_URL).replace(/\/$/, '');

const siteUrlPlugin = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', getSiteUrl()),
});

export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/.netlify/functions': 'http://localhost:9999',
    },
  },
});
