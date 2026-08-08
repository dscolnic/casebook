import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

// The engine imports its content through `@theme`, and its world through
// `@world`. Pointing both at this game is what lets it share gamekit's core
// instead of carrying a forked copy of it.
export default defineConfig({
  resolve: {
    // The engine lives outside this package, so without this three.js resolves
    // twice — once from gamekit/node_modules and once from here. Two THREE
    // instances break every instanceof check between them and double the
    // download.
    dedupe: ['three'],
    alias: {
      '@theme': resolve(here, '.'),
      '@world': resolve(here, 'src/world.js'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          curriculum: ['./src/curriculum.js'],
          three: ['three']
        }
      }
    }
  }
})
