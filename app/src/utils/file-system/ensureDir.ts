import { FileSystem } from '@/services/FileSystem'

export const ensureDir = async (path: string) => {
  if (!(await FileSystem.exists(path))) {
    await FileSystem.mkdir(path, { recursive: true })
  }
}
