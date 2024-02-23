import type { ExtensionModule } from '@rokii/api'
import { client } from '@/services/plugins'
import { getPlugins } from './utils/loadPlugins'
import { PluginInfo } from './types'

/**
 * Check plugins for updates and start plugins autoupdater
 */
async function updateInstalledPlugins(plugins: PluginInfo[]) {
  console.log('Run plugins autoupdate')

  const updatePromises = plugins
    .filter((p) => p.isUpdateAvailable)
    .map((p) => () => client.updatePackage(p.name))

  await Promise.all(updatePromises)

  console.log(
    updatePromises.length > 0
      ? `${updatePromises.length} plugins have been updated`
      : 'All plugins are up to date'
  )

  // Run autoupdate every 12 hours
  setTimeout(updateInstalledPlugins, 12 * 60 * 60 * 1000)
}

export const initializeAsync: ExtensionModule['initializeAsync'] = async (send) => {
  const plugins = await getPlugins()
  updateInstalledPlugins(plugins)
  send(plugins)
}
