import { convertFileSrc } from '@tauri-apps/api/core'

/**
 * This module is used to import external modules dynamically.
 */
const ExternalModuleImporter = {
  async import<T = any>(modulePath: string, forceCacheBust = false): Promise<T> {
    const normalizedPath = this.normalizePath(modulePath)

    if (forceCacheBust) {
      const cacheBust = `?cacheBust=${Date.now()}`
      return import(/* @vite-ignore */ normalizedPath + cacheBust)
    }

    return import(/* @vite-ignore */ normalizedPath)
  },

  normalizePath(path: string) {
    return convertFileSrc(path)
  }
}

Object.freeze(ExternalModuleImporter)

export { ExternalModuleImporter }
