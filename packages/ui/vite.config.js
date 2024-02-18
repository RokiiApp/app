import { resolve } from 'path'
import { defineConfig } from 'vite'

import packageJson from './package.json'

const externalDeps = Object.keys(packageJson.dependencies)

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: externalDeps
    },
  },
})
