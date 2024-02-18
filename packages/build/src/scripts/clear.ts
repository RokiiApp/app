import path from 'node:path'
import fs from 'node:fs'

const dist = path.resolve('dist')

if (fs.existsSync(dist)) {
  console.log(`🚮 Removing ${dist}...`)
  fs.rmSync(dist, { recursive: true, force: true })
  console.log('✅ Removed!')
}
