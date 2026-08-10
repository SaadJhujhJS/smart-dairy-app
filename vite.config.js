import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Configure ViteSSG settings for page pre-rendering
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths, routes) {
      // Manually map out standard and dynamic pages so they are crawled correctly
      return [
        '/',
        '/products',
        '/checkout',
        '/order-confirmation',
        '/product/pure-small-bee-honey',
        '/product/pure-big-bee-honey',
        '/product/pure-desi-ghee',
        '/product/fresh-dani-khoya'
      ]
    }
  }
})
