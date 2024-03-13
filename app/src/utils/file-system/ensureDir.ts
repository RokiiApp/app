import { exists, createDir } from '@tauri-apps/api/fs'

export const ensureDir = async (path: string) => {
  if (!(await exists(path))) {
    createDir(path, { recursive: true })
  }
}
