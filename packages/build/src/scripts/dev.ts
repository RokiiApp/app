import path from 'node:path'
import fs from 'node:fs'
import url from 'node:url'
import { build } from "vite"

const {
  default: pkgJson
} = await import(url.pathToFileURL('package.json').href, { assert: { type: "json" } })

const appName = 'app.rokii.dev'

/** Plugin name without scope */
const pluginName = pkgJson.name.split('/').pop()

const appDataPath = process.env.APPDATA ?? ''

const symlinkPath = path.join(appDataPath, appName, 'plugins', pluginName)

function removeSymlink() {
  console.log('🚮 Removing symlink')
  fs.unlinkSync(symlinkPath)
}

console.log('⌛ Starting plugin development mode...')
if (fs.existsSync(symlinkPath)) {
  console.log('🔎 Symlink already exist')
  removeSymlink()
}

console.log('✅ Create symlink')
fs.symlinkSync(path.resolve(), symlinkPath)

// Handle ctrl+c to remove symlink to plugin
process.on('SIGHUP', removeSymlink)
process.on('SIGINT', removeSymlink)
process.on('SIGTERM', removeSymlink)
process.on('SIGBREAK', removeSymlink)

console.log('✅ Starting bundler...')

await build({
  root: process.cwd(),
  build: {
    minify: false,
    lib: {
      entry: './src/index',
      formats: ['es'],
      fileName: "index"
    },
    target: "esnext",
    outDir: "dist",
    emptyOutDir: true,
    watch: {
      include: 'src/**'
    }
  }
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
