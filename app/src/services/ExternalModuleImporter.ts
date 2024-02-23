import { convertFileSrc } from '@tauri-apps/api/tauri'

/**
 * This class is used to import external modules dynamically.
 */
export class ExternalModuleImporter {
  static async importModule(modulePath: string, forceCacheBust = false) {
    const normalizedPath = this.normalizePath(modulePath)

    if (forceCacheBust) {
      const cacheBust = `?cacheBust=${Date.now()}`
      return import(/* @vite-ignore */ normalizedPath + cacheBust)
    }

    return import(/* @vite-ignore */ normalizedPath)
  }

  private static normalizePath(path: string) {
    return convertFileSrc(path)
  }
}
