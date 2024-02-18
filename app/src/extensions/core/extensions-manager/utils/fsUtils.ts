import { PLUGINS_PATH } from '@/common/constants/paths'
import { metadata } from 'tauri-plugin-fs-extra-api'
import { join } from '@tauri-apps/api/path'
import { FileEntry, readDir } from '@tauri-apps/api/fs'

export const isSymlink = async (path: string) => {
  const fileInfo = await metadata(path)
  return fileInfo.isSymlink
}

export const isScopeDir = async (file: FileEntry) => {
  const fileNameMatchesScope = file.name?.match(/^@/)
  if (fileNameMatchesScope == null) return false

  const fileInfo = await metadata(file.path)
  return fileInfo.isDir
}

export const getSymlinkedPluginsInFolder = async (scope?: string) => {
  const files = scope
    // We use `catch` to handle errors when folder doesn't exist or it's not a folder (e.g. a file)
    ? await readDir(await join(PLUGINS_PATH, scope)).catch(() => [])
    : await readDir(PLUGINS_PATH).catch(() => [])

  // filter bur with async
  const resultPromises = files.map(async ({ path }) => await isSymlink(path))

  const results = await Promise.all(resultPromises)

  return files.filter((_, index) => results[index]).map(file => file.name).filter(Boolean) as string[]
}
