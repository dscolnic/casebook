
import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    // The engine lives outside this package, so three.js would otherwise
    // resolve twice and break every instanceof between the two copies.
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
