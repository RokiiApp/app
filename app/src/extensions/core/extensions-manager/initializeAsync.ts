import type { ExtensionModule } from '@rokii/api'
import type { ExtensionInfo } from './types'
import { client } from '@/services/plugins'
import { getPlugins } from './utils/loadPlugins'

/**
 * Check plugins for updates and start plugins autoupdater
 */
async function updateInstalledPlugins(plugins: ExtensionInfo[]) {
  console.log('Run plugins autoupdate')

  const pluginsToUpdate = plugins.filter((p) => p.updateAvailable)

  const updatePromises = pluginsToUpdate.map((p) => client.updatePackage(p.name))

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
  const initialPlugins = await getPlugins()
  await updateInstalledPlugins(initialPlugins)
  const updatedPlugins = await getPlugins()
  send(updatedPlugins)
}
