import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Base public path when served in development or production.
  base: '/',

  // Directory to serve as plain static assets.
  publicDir: 'public',

  resolve: {
    alias: {
      // Alias the @ symbol to the src/ directory.
      '@': '/src',
    },
  },

  // Build options
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        index: './index.html',
        app: './src/index.ts',
      },
    },
  },

  // Server options
  server: {
    port: 9054,
  },

  // Plugins
  plugins: [vue()],
})
