import type { PluginModule } from '@rokii/api'
import { client } from '@/services/plugins'
import { getPlugins } from './utils/loadPlugins'

/**
 * Check plugins for updates and start plugins autoupdater
 */
async function updateInstalledPlugins () {
  console.log('Run plugins autoupdate')
  const plugins = await getPlugins()

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

export const initializeAsync: PluginModule['initializeAsync'] = async () => {
  updateInstalledPlugins()
}
