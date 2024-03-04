import { build } from "vite"

console.log('⌛ Creating bundle...')

await build({
  root: process.cwd(),
  build: {
    minify: "esbuild",
    lib: {
      entry: './src/index',
      formats: ['es'],
      fileName: "index"
    },
    target: "esnext",
    outDir: "dist",
    emptyOutDir: true
  }
}).then(() => {
  console.log('✅ Build finished')
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
