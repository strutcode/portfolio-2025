import { defineConfig } from 'vitest/config'
console.log('config')

export default defineConfig({
  test: {
    globals: true,
    restoreMocks: true,
    alias: {
      '@': '/src',
    },
  },
})
