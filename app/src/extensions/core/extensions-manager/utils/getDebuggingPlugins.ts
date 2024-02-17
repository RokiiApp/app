import { readDir } from '@tauri-apps/api/fs'
import { getSymlinkedPluginsInFolder, isScopeDir } from './fsUtils'
import { PLUGINS_PATH } from '@/common/constants/paths'

const getNotScopedPluginNames = async () => await getSymlinkedPluginsInFolder()

const getScopedPluginNames = async () => {
  // Get all scoped folders
  const dirContent = await readDir(PLUGINS_PATH)
  const scopeSubfolders = dirContent.filter(isScopeDir)

  const scopePluginsNamePromises = scopeSubfolders.map(async (scope) => {
    const symlinkedPlugins = await getSymlinkedPluginsInFolder(scope.name)
    return symlinkedPlugins.map((plugin) => `${scope}/${plugin}`)
  })

  const scopePluginNames = (await Promise.all(scopePluginsNamePromises)).flat()

  return scopePluginNames
}

/**
 * Get list of all plugins that are currently in debugging mode.
 */
export default async () => {
  const [notScoppedPluginNames, scopedPluginNames] = await Promise.all([
    getNotScopedPluginNames(),
    getScopedPluginNames()
  ])
  return [...notScoppedPluginNames, ...scopedPluginNames]
}
