import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  // History-mode SPA served at domain root; '/' keeps deep-link asset paths correct.
  base: '/',
  plugins: [
    vue(),
    // Treeshake + auto-import Vuetify components/directives
    vuetify({ autoImport: true }),
  ],
  // Keep legacy VUE_APP_* env vars working alongside Vite's VITE_*
  envPrefix: ['VITE_', 'VUE_APP_'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.vue'],
  },
  server: {
    port: 8080,
  },
})
