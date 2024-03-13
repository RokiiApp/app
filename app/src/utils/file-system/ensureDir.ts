import { exists, mkdir } from '@tauri-apps/plugin-fs'

export const ensureDir = async (path: string) => {
  if (!(await exists(path))) {
    await mkdir(path, { recursive: true })
  }
}
