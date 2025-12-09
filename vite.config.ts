import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'build',
    cssMinify: true,
  },
  server: {
    port: 3000,
    open: false,
  },
});
