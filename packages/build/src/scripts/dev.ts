import path from 'node:path'
import fs from 'node:fs'
import url from 'node:url'
import * as esbuild from 'esbuild'
import CssModulesPlugin from 'esbuild-css-modules-plugin'

const {
  default: pkgJson
} = await import(url.pathToFileURL('package.json').href, { assert: { type: 'json' } })

const appName = 'app.rokii.dev'

/** Plugin name without scope */
const pluginName = pkgJson.name.split('/').pop()

const appDataPath = process.env.APPDATA ?? ''

const symlinkPath = path.join(appDataPath, appName, 'plugins', pluginName)

function removeSymlink () {
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

const configFile = url.pathToFileURL('rokii.build.js')
let config = {}

if (fs.existsSync(configFile)) {
  config = await import(configFile.toString()).then(m => m.config)
  console.log('✅ Loaded configuration file from: ', configFile.toString())
}

const esbuildCtx = await esbuild
  .context({
    logLevel: 'info',
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    minify: false,
    format: 'esm',
    target: 'es2020',
    loader: { '.js': 'jsx', '.png': 'dataurl', '.svg': 'text' },
    outfile: './dist/index.js',
    plugins: [CssModulesPlugin()],
    ...config
  })

esbuildCtx
  .watch()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
