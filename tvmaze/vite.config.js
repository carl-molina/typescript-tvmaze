import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'build'
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});