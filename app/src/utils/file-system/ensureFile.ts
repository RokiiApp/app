import { exists, writeTextFile } from '@tauri-apps/plugin-fs'

export const ensureFile = async (src: string, content = '') => {
    if (!(await exists(src))) {
      await writeTextFile(src, content)
    }
  }
