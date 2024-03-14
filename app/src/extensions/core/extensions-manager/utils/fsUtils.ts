import { PLUGINS_PATH } from '@/common/constants/paths'
import { join } from '@tauri-apps/api/path'
import { FileSystem, type DirEntry } from '@/services/FileSystem'

export const isScopeDir = async (file: DirEntry) => {
  const fileNameMatchesScope = file.name?.match(/^@/)
  if (fileNameMatchesScope == null) return false

  return file.isDirectory;
}

export const getSymlinkedPluginsInFolder = async (scope?: string) => {
  const files = scope
    // We use `catch` to handle errors when folder doesn't exist or it's not a folder (e.g. a file)
    ? await FileSystem.readDir(await join(PLUGINS_PATH, scope)).catch(() => [])
    : await FileSystem.readDir(PLUGINS_PATH).catch(() => [])

  return files.filter(file => file.isSymlink)
}
