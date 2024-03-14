import { FileSystem } from '@/services/FileSystem'

export const ensureFile = async (src: string, content = '') => {
    if (!(await FileSystem.exists(src))) {
      await FileSystem.writeTextFile(src, content)
    }
}
