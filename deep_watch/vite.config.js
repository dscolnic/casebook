import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// Pin root/entry to THIS file's directory so Vite never depends on the shell's
// working directory (which, if it resolves to a path containing "#" or "?",
// breaks Vite's root detection and the index.html entry lookup).
const root = fileURLToPath(new URL('.', import.meta.url));

// Deep Watch is a plain ES-module + Three.js project (no framework).
// Base is relative so a static `dist/` can be hosted from any subpath.
export default defineConfig({
  root,
  base: './',
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  server: {
    port: 5173,
    // Auto-open the game in the default browser so `npm run dev` visibly starts.
    open: true,
    // If 5173 is taken (e.g. a stale dev server), pick the next free port rather
    // than silently failing — the chosen URL is printed as "Local:".
    strictPort: false,
  },
  build: {
    target: 'es2022',
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: fileURLToPath(new URL('./index.html', import.meta.url)),
    },
  },
});
