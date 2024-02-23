import { PLUGINS_PATH } from '@/common/constants/paths'
import { join } from '@tauri-apps/api/path'
import { ExternalModuleImporter } from '@/services/ExternalModuleImporter'
import { Extension } from '@/extensions/Extension'

/**
 * Requires an extension from the plugins folder,
 * and returns an instance of the extension
 * 
 * This method is always safe to call, and will never throw an error
 * If the plugin is not found, or if there is an error loading the plugin,
 * it will return null, but will not throw an error
 */
export const requireExtension = async (pluginName: string) => {
  const pluginPath = await join(PLUGINS_PATH, pluginName, 'dist', 'index.js')

  const forceCacheBust = true

  try {
    const module = await ExternalModuleImporter.importModule(pluginPath, forceCacheBust)

    const extension = new Extension(module.default)

    return extension
  } catch (error) {
    console.error(`[requireExtension] - Error loading plugin: ${pluginName}`, error)
    return null
  }
}
