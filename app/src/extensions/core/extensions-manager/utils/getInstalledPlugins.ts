import { getInstalledPluginsAndVersions } from '@/services/plugins/getExternalPlugins'

/**
 * Get list of all installed plugins with versions
 */
export const getInstalledPlugins = async () => {
  const installedExtensions = await getInstalledPluginsAndVersions()

  const installedEntries = Object.entries(installedExtensions)

  const result = installedEntries.map(([pluginName, installedVersion]) => {
    return {
      name: pluginName,
      version: installedVersion
    }
  })

  return result
}
