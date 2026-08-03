import { defineConfig } from 'vite';

// Deep Watch is a plain ES-module + Three.js project (no framework).
// Base is relative so a static `dist/` can be hosted from any subpath.
export default defineConfig({
  base: './',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: true,
  },
});
