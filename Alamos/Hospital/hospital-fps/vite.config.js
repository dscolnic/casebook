
import { defineConfig } from 'vite'
export default defineConfig({
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
