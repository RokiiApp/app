import { exists, writeFile } from '@tauri-apps/api/fs'

export const ensureFile = async (src: string, content = '') => {
    if (!(await exists(src))) {
      writeFile(src, content)
    }
  }
