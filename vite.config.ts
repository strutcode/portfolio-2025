import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import metaBundlePlugin from './build/metaBundlePlugin'

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

  esbuild: {
    sourcemap: process.env.NODE_ENV !== 'production',
  },

  // Build options
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        index: './index.html',
        loader: './src/loader.ts',
        app: './src/index.ts',
      },
      output: {
        manualChunks: {
          index: ['./index.html'],
          loader: ['./src/loader.ts'],
          app: ['./src/index.ts', '@babylonjs/core', '@babylonjs/loaders/glTF/2.0'],
        },
      },
    },
  },

  // Server options
  server: {
    port: 9054,
  },

  // Plugins
  plugins: [
    vue(),
    metaBundlePlugin,
  ],
})
